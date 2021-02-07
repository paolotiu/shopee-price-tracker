import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { PriceWithDate } from "utils/api";
import { responsivefy } from "./responsivefy";
interface Props {
  data: PriceWithDate[];
}

const PriceChart = ({ data: rawData }: Props) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [price, setPrice] = useState(0);
  const [date, setDate] = useState("");

  const setTooltipContent = (price: number, date: string) => {
    setPrice(price);
    setDate(date);
  };
  useEffect(() => {
    if (rawData.length) {
      rawData.forEach((x) => (x.time = new Date(x.time)));
      render(rawData, svgRef, setTooltipContent);
      let windowWidth = window.innerWidth;

      // Rerender everytime window size changes
      const renderChart = () => {
        if (window.innerWidth !== windowWidth && svgRef.current) {
          windowWidth = window.innerWidth;
          render(rawData, svgRef, setTooltipContent);
        }
      };
      window.addEventListener("resize", renderChart);

      return () => window.removeEventListener("resize", renderChart);
    }
  }, []);
  return (
    <div id="container" className="relative top-0 left-0 overflow-hidden">
      <div
        id="chart-tooltip"
        className="absolute transition duration-200 shadow-md opacity-0 pointer-events-none"
      >
        <p
          className="px-2 py-1 font-bold text-gray-600 bg-gray-300 rounded-b-none bg-opacity-80"
          style={{ fontSize: "10px" }}
        >
          {date}
        </p>
        <p className="px-2 py-1 text-sm font-bold text-black bg-white rounded-b">
          P{price}
        </p>
      </div>
      <svg ref={svgRef} style={{ touchAction: "none" }}>
        <linearGradient
          id="gradient"
          gradientUnits="userSpaceOnUse"
          x1="0%"
          y1="0%"
          x2="0%"
          y2="100%"
        >
          <stop offset="5%" stopColor="#FF8D28" />
          <stop offset="80%" stopColor="#FF8D28" stopOpacity="0" />
        </linearGradient>
      </svg>
    </div>
  );
};

export default PriceChart;

function render(
  data: PriceWithDate[],
  svgRef: React.RefObject<SVGSVGElement>,
  setTooltipContent: (price: number, date: string) => void
) {
  // Configs
  const windowWidth = window.innerWidth;
  const fontSize = 7,
    strokeWidth = 0.8;
  let margin = { top: 10, right: 30, bottom: 30, left: 40 },
    width = 400 - margin.left - margin.right,
    height = 150 - margin.top - margin.bottom;

  if (windowWidth < 500) {
    // Change width if screen size is small
    width = 200;
  }

  // Cleanup on rerender

  d3.select(svgRef.current).select(".tooltip").remove();
  d3.select(svgRef.current).selectAll("g").remove();
  d3.select(svgRef.current).select("circle").remove();

  // Create group
  const svg = d3
    .select(svgRef.current)
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .call(responsivefy)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // Create x-scale
  const x = d3
    .scaleTime()
    .domain(d3.extent(data, (d) => d.time) as [Date, Date])
    .range([0, width]);

  // Format xAxis
  const xAxis = d3
    .axisBottom(x)
    .tickPadding(5)
    .tickSizeOuter(0)
    .tickSizeOuter(10)
    .ticks(5)
    .tickFormat(d3.timeFormat("%m/%d") as any);
  // Append x-Axis
  svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
    .style("stroke-width", strokeWidth)
    .style("font-size", fontSize);

  // Create y-Scale
  const y = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.price) as number])
    .range([height, 0]);

  // Append y-axis
  svg
    .append("g")
    .call(d3.axisLeft(y).ticks(5))
    .style("stroke-width", strokeWidth)
    .style("font-size", fontSize);

  if (data.length <= 1) {
    console.log("hey");
    svg
      .append("text")
      .text("Not enough data available")
      .attr("class", "text-gray-300 text-base")
      .style("text-anchor", "middle")
      .style(
        "transform",
        `translate(${x(data[0].time)}px, ${height / 2 + margin.top}px)`
      );
    return;
  }
  // Create line generator
  const line = d3
    .line<PriceWithDate>()
    .x((d) => x(d.time))
    .y((d) => y(d.price));

  // Create area generator
  const area = d3
    .area<PriceWithDate>()
    .x((d) => x(d.time))
    .y0(y(0))
    .y1((d) => y(d.price));

  // Append both line and area
  svg
    .append("path")
    .style("fill", "url(#gradient)")
    .attr("stroke-width", 0.5)
    .attr("d", area(data)!);

  svg
    .append("path")
    .attr("fill", "none")
    .attr("stroke", "#FF8D28")
    .attr("d", line(data)!);

  //
  // TOOLTIP
  //
  const focus = svg.append("g").style("display", "none");

  focus
    .append("circle")
    .attr("r", 3)
    .attr("class", "fill-current dark:text-white text-white-pure");

  // const tooltip = d3
  //   .select(svgRef.current)
  //   .append("g")
  //   .style("opacity", 0)
  //   .attr("class", "relative");
  // const tooltipBg = tooltip
  //   .append("rect")
  //   .style("fill", "none")
  //   .attr("class", "w-10 h-5 absolute text-dark rounded ");
  // const tooltipText = [1, 2, 3].map(() => {
  //   return tooltip
  //     .append("text")
  //     .style("font-size", ".5em")
  //     .attr(
  //       "class",
  //       " pointer-events-none fill-current dark:text-white text-dark"
  //     );
  // });

  const tooltip = d3.select("#chart-tooltip");
  svg
    .append("rect")
    .attr("width", width)
    .attr("height", height)
    .style("z-index", 1000)
    .style("opacity", 0)
    .on("mouseover touchstart", () => {
      focus.style("display", null);
      tooltip.style("opacity", 100);
    })
    .on("mouseout touchend", () => {
      focus.style("display", "none");
      tooltip.style("opacity", 0);

      // tooltip.transition().duration(300).style("opacity", 0);
    })
    .on("mousemove touchmove", mousemove);

  function mousemove(this: SVGRectElement, event: any) {
    const bisect = d3.bisector((d: PriceWithDate) => d.time).left;
    const xPos = d3.pointers(event)[0][0];
    const x0 = bisect(data, x.invert(xPos - 2));
    const d0 = data[x0];

    if (!d0) {
      // if no data
      return;
    }
    focus.attr("transform", `translate(${x(d0.time)},${y(d0.price)})`);
    // tooltip.transition().duration(100).style("opacity", 0.9);
    // console.log(xPos, x(d0.time));

    setTooltipContent(d0.price, d3.timeFormat("%m/%d  %H:%M")(d0.time));
    // tooltipText.forEach((elem, i) => {
    //   elem.style(
    //     "transform",
    //     `translate(${x(d0.time) + 20}px,${y(d0.price) + 30 + 10 * i}px)`
    //   );

    //   switch (i) {
    //     case 0:
    //       elem.text(`Price: P${d0.price}`);
    //       break;
    //     case 1:
    //       elem.text(`Date: ${d3.timeFormat("%m/%d")(d0.time)}`);
    //       break;
    //     case 2:
    //       elem.text(`Time: ${d3.timeFormat("%H:%M")(d0.time)}`);
    //       break;
    //     default:
    //       break;
    //   }
    // });

    // Get left and top offset of cursor
    const leftOffset =
      (event.pageX || event.targetTouches[0].pageX) -
      (svgRef.current?.getBoundingClientRect().x || 0);
    // const topOffest =
    //   (event.pageY || event.targetTouches[0].pageY) -
    //   (svgRef.current?.getBoundingClientRect().y || 0) -
    //   window.pageXOffset;

    const isHalfway = x0 / data.length < 0.5;

    tooltip
      .transition()
      .duration(100)
      .style("left", `${leftOffset + (isHalfway ? 40 : -90)}px`)
      .style("top", `${y(d0.price)}px`);
    // tooltipBg.style(
    //   "transform",
    //   `translate(${x(d0.time) + 18}px,${y(d0.price) + 15}px)`
    // );
  }
  // function mousemove(event) {
  //   const xPos = d3.mouse(this)[0];
  //   const x0 = bisect(data, xScale.invert(xPos));
  //   const d0 = data[x0];
  //   focus.attr(
  //     "transform",
  //     `translate(${xScale(d0.label)},${yScale(d0.value)})`
  //   );
  //   tooltip.transition().duration(300).style("opacity", 0.9);
  //   tooltip
  //     .html(d0.tooltipContent || d0.label)
  //     .style(
  //       "transform",
  //       `translate(${xScale(d0.label) + 30}px,${yScale(d0.value) - 30}px)`
  //     );
  // }
}
