import * as d3 from "d3";
export function responsivefy(
  svg: d3.Selection<any, any, any, any>,
  ...args: any[]
) {
  // get container + svg aspect ratio
  const container = d3.select(svg.node()?.parentNode as any),
    width = parseInt(svg.style("width")),
    height = parseInt(svg.style("height"));

  let aspect = width / height;
  // add viewBox and preserveAspectRatio properties,
  // and call resize so that svg resizes on inital page load
  svg
    .attr("viewBox", "0 0 " + width + " " + height)
    .attr("perserveAspectRatio", "xMinYMid")
    .call(resize);

  // to register multiple listeners for same event type,
  // you need to add namespace, i.e., 'click.foo'
  // necessary if you call invoke this function for multiple svgs
  // api docs: https://github.com/mbostock/d3/wiki/Selections#on
  d3.select(window).on("resize." + container.attr("id"), () => {
    resize();
  });

  // get width of container and resize svg to fit it
  function resize() {
    if (!svg.style("width")) {
      d3.select(window).on("resize." + container.attr("id"), () => {
        return null;
      });
      return;
    }

    var targetWidth = parseInt(container.style("width"));
    svg.attr("width", targetWidth);
    svg.attr("height", Math.round(targetWidth / aspect));
  }
}
