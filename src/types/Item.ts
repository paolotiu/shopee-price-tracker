namespace Item {
  export interface Category {
    display_name: string;
    catid: number;
    image?: any;
    no_sub: boolean;
    is_default_subcat: boolean;
    block_buyer_platform?: any;
  }

  export interface ItemRating {
    rating_star: number;
    rating_count: number[];
    rcount_with_image: number;
    rcount_with_context: number;
  }

  export interface Attribute {
    is_pending_qc: boolean;
    idx: number;
    value: string;
    id: number;
    is_timestamp: boolean;
    name: string;
  }

  export interface CoinInfo {
    spend_cash_unit: number;
    coin_earn_items: any[];
  }

  export interface PriceStock {
    model_id: any;
    stockout_time?: any;
    region: string;
    rebate?: any;
    price: number;
    promotion_type: number;
    allocated_stock?: any;
    shop_id: number;
    end_time?: any;
    stock_breakdown_by_location: any[];
    item_id: any;
    promotion_id: number;
    purchase_limit?: any;
    start_time?: any;
    stock: number;
  }

  export interface Extinfo {
    seller_promotion_limit?: number;
    has_shopee_promo?: any;
    group_buy_info?: any;
    holiday_mode_old_stock?: any;
    tier_index: number[];
    seller_promotion_refresh_time: number;
  }

  export interface Model {
    itemid: any;
    status: number;
    current_promotion_reserved_stock: number;
    name: string;
    promotionid: number;
    price: number;
    price_stocks: PriceStock[];
    current_promotion_has_reserve_stock: boolean;
    currency: string;
    normal_stock: number;
    extinfo: Extinfo;
    price_before_discount: number;
    modelid: any;
    sold: number;
    stock: number;
  }

  export interface TierVariation {
    images: any[];
    properties: any[];
    type: number;
    name: string;
    options: string[];
  }

  export interface Item {
    itemid: number;
    price_max_before_discount: number;
    item_status: string;
    can_use_wholesale: boolean;
    show_free_shipping: boolean;
    estimated_days: number;
    is_hot_sales?: any;
    is_slash_price_item: boolean;
    upcoming_flash_sale?: any;
    slash_lowest_price?: any;
    is_partial_fulfilled: boolean;
    condition: number;
    add_on_deal_info?: any;
    is_non_cc_installment_payment_eligible: boolean;
    categories: Category[];
    ctime: number;
    name: string;
    show_shopee_verified_label: boolean;
    size_chart: string;
    is_pre_order: boolean;
    service_by_shopee_flag: number;
    historical_sold: number;
    reference_item_id: string;
    recommendation_info?: any;
    bundle_deal_info?: any;
    price_max: number;
    has_lowest_price_guarantee: boolean;
    shipping_icon_type: number;
    images: string[];
    price_before_discount: number;
    cod_flag: number;
    catid: number;
    is_official_shop: boolean;
    coin_earn_label?: any;
    hashtag_list?: any;
    sold: number;
    makeup?: any;
    item_rating: ItemRating;
    show_official_shop_label_in_title: boolean;
    discount?: any;
    reason?: any;
    label_ids: number[];
    has_group_buy_stock: boolean;
    other_stock: number;
    deep_discount?: any;
    attributes: Attribute[];
    badge_icon_type: number;
    liked: boolean;
    cmt_count: number;
    image: string;
    recommendation_algorithm?: any;
    is_cc_installment_payment_eligible: boolean;
    shopid: number;
    normal_stock: number;
    video_info_list: any[];
    installment_plans?: any;
    view_count: number;
    voucher_info?: any;
    current_promotion_has_reserve_stock: boolean;
    liked_count: number;
    show_official_shop_label: boolean;
    price_min_before_discount: number;
    show_discount: number;
    preview_info?: any;
    flag: number;
    exclusive_price_info?: any;
    current_promotion_reserved_stock: number;
    wholesale_tier_list: any[];
    group_buy_info?: any;
    shopee_verified: boolean;
    hidden_price_display?: any;
    transparent_background_image: string;
    welcome_package_info?: any;
    discount_stock: number;
    coin_info: CoinInfo;
    is_adult: boolean;
    currency: string;
    raw_discount: number;
    is_preferred_plus_seller: boolean;
    is_category_failed: boolean;
    price_min: number;
    can_use_bundle_deal: boolean;
    cb_option: number;
    brand: string;
    stock: number;
    status: number;
    bundle_deal_id: number;
    is_group_buy_item?: any;
    description: string;
    flash_sale?: any;
    models: Model[];
    has_low_fulfillment_rate: boolean;
    price: number;
    shop_location: string;
    tier_variations: TierVariation[];
    makeups?: any;
    welcome_package_type: number;
    show_official_shop_label_in_normal_position?: any;
    item_type: number;
  }

  export interface RootObject {
    item: Item;
    version: string;
    data?: any;
    error_msg?: any;
    error?: any;
  }
}
