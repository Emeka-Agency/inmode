// Strapi interfaces
// Collections

export interface InmodePanel_Clinic_Interface {
    name: string;
    address: string;
    city: string;
    doctor: string;
    mail: string;
    number: string;
    street: string;
    url: string;
    url_label: string;
    zip_code: string;
    treatments?: {
        MenuParams: InmodePanel_Generic_MenuParams_Interface
    }[];
};

export interface Airtable_Clinic_Interface {
    id: string;
    doctor: string;
    name: string;
    address: string;
    zip_code: string;
    city: string;
    shire: string;
    url: string;
    mail: string;
    number: string;
    region: string;
    treatments: string[] | undefined;
}

export interface Airtable_Event_Interface {
    id: string;
    EventName?: string;
    Start?: string;
    End?: string;
    Practitioner?: string;
    DisplayMachines?: boolean;
    Address?: string;
    Place?: string;
    PlaceURL?: string;
    Addons?: string[];
    EventType?: string;
    EventDescription?: string;
    MapsLink?: string;
    VideoURL?: string;
    Picture?: any;
};

export interface Airtable_Picture_Interface {
    width: number;
    height: number;
    id: string;
    thumbnails: {
        full: {
            url: string;
            width: number;
            height: number;
        }
        large: {
            url: string;
            width: number;
            height: number;
        }
        small: {
            url: string;
            width: number;
            height: number;
        }
    };
    url: string;
    type: string;
}

export interface InmodePanel_Addon_Interface {
    id?: string;
    strapiId?: string;
    Name?: string;
    Banner? : InmodePanel_Base_Banner_Interface;
    WhatIs?: InmodePanel_Generic_WhatIs_Interface;
    KeyBenefits?: InmodePanel_Base_Texte_Interface[];
    Videos?: InmodePanel_Addon_Video_Interface[];
    BeforesAfters?: InmodePanel_Generic_BeforeAfter_Interface[];
    WhatTreats?: InmodePanel_Addon_WhatTreat_Interface[];
    ClinicalStudies?: InmodePanel_Generic_ClinicalStudies_Interface[];
    ProductPresentation?: InmodePanel_Addon_ProductPresentation_Interface[];
    Price?: number;
    Products?: InmodePanel_Product_Interface[];
    Page_addon?: boolean;
    BeforeKeyBenefits?: string;
    AfterKeyBenefits?: string;
    SellingArgs?: InmodePanel_Generic_SellingArgs_Interface[];
    SellingNewGeneration?: InmodePanel_Generic_SellingNewGeneration_Interface;
    RelatedAddonTreats?: InmodePanel_Base_RelatedAddonTreat_Interface[];
    MenuParams: InmodePanel_Generic_MenuParams_Interface;
    sensitivity: boolean;
    menus?: InmodePanel_Menu_Interface[];
    products?: InmodePanel_Product_Interface[];
    treatments?: InmodePanel_Treatment_Interface[];
    mini_treatments?: InmodePanel_Treatment_Interface[];
    mini_products?: InmodePanel_Product_Interface[];
    mini_addons?: InmodePanel_Addon_Interface[];
};
export interface InmodePanel_Event_Interface {
    picture: {
        localFile: GatsbyImage_Interface;
        aspectRatio: number;
    };
    title: string;
    short_descr: string;
    address: string;
    video_url: string;
    begin: string;
    finish: string;
    type: string;
    place: string;
    place_url: string;
    maps_link: string;
    addons: InmodePanel_Addon_Interface[];
    strapiId: string;
};
export interface InmodePanel_Menu_Interface {
    id?: string|number;
    strapiId?: string|number;
    title?: string;
    url?: string;
    type?: string;
    variant?: string;
    container?: string;
    products?: InmodePanel_Product_Interface[];
    treatments?: InmodePanel_Treatment_Interface[]
    menus?: InmodePanel_Menu_Interface[];
    parent_menu?: boolean;
    icon?: {
        localFile: GatsbyImage_Interface
    };
    icon_hover?: {
        localFile: GatsbyImage_Interface
    };
    internal_link?: boolean;
    mini_treatments?: InmodePanel_Treatment_Interface[];
    mini_products?: InmodePanel_Product_Interface[];
    mini_addons?: InmodePanel_Addon_Interface[];
};
export interface InmodePanel_Product_Interface {
    strapiId: number;
    id: number;
    Name: string;
    Banner: InmodePanel_Base_Banner_Interface;
    WhatIs: InmodePanel_Generic_WhatIs_Interface;
    BeforeKeyBenefits: string;
    KeyBenefits: InmodePanel_Base_Texte_Interface[];
    ClinicalStudies: InmodePanel_Generic_ClinicalStudies_Interface[];
    Price: Number 	
    ShopDescription: string;
    Icon: {
        localFile: GatsbyImage_Interface;
    };
    Tags: InmodePanel_Tags_Interface[]; // TODO
    Addons: InmodePanel_Addon_Interface[];
    BeforesAfters: InmodePanel_Generic_BeforeAfter_Interface[];
    SellingArgs: InmodePanel_Generic_SellingArgs_Interface[];
    WhatIsProduct: InmodePanel_Product_WhatIsProduct_Interface[];
    Demo: InmodePanel_Generic_Demo_Interface;
    ShopTreats: InmodePanel_Base_Texte_Interface[];
    ShopPicture: {
        localFile: GatsbyImage_Interface
    };
    treatments: InmodePanel_Treatment_Interface[];
    RelatedAddonTreatment: InmodePanel_Product_RelatedAddonTreatment_Interface[];
    MenuParams: InmodePanel_Generic_MenuParams_Interface;
    position: Number;
    short_descr: string;
    sensitivity: boolean;
};
export interface InmodePanel_Shop_Interface {
    strapiId?: number;
    reference?: string;
    Name?: string;
    pack_size?: number;
    pack_type?: string;
    price?: number;
    discount?: number;
    description?: string;
    pictures?: {
        formats: {
            thumbnail : {
                localFile: GatsbyImage_Interface
            };
        };
        url?: string;
    }[];
    relative?: string;
};
export interface InmodePanel_TagFamily_Interface {
    FamilyName: string;
    tags: InmodePanel_Tags_Interface[];
};
export interface InmodePanel_Tags_Interface {
    tag: string;
    products: InmodePanel_Product_Interface[];
    tag_families: InmodePanel_TagFamily_Interface[];
};
export interface InmodePanel_Treatment_Interface {
    strapiId:number;
    Name?: string;
    WhatIsTreat?: InmodePanel_Generic_WhatIs_Interface;
    Banner?: InmodePanel_Treat_Banner_Interface;
    BeforesAfters?: InmodePanel_Generic_BeforeAfter_Interface[];
    ClinicalStudies?: InmodePanel_Generic_ClinicalStudies_Interface[];
    IncludeTitle?: string;
    IncludeList?: InmodePanel_Base_Texte_Interface[];
    products?: InmodePanel_Product_Interface[];
    MenuParams: InmodePanel_Generic_MenuParams_Interface;
    sensitivity: boolean;
};

// Single types

export interface InmodePanel_AboutUs_Interface {
    banner?: {
        localFile: GatsbyImage_Interface
    };
    about_video_url?: string;
    about_txt?: string;
    learn_bg?: {
        localFile: GatsbyImage_Interface
    } | undefined;
    learn_icon?: {
        localFile: GatsbyImage_Interface
    } | undefined;
    learn_txts?: InmodePanel_Base_SectionTitreText_Interface[];
    learn_values?: InmodePanel_Base_Texte_Interface[];
    staff?: InmodePanel_Generic_Staff_Interface[];
    menus?: InmodePanel_Menu_Interface[];
};
export interface InmodePanel_Footer_Interface {
    logo: {
        localFile: GatsbyImage_Interface
    } | undefined;
    address: string;
    phone: string;
    mail: string;
    social: InmodePanel_Generic_Social_Interface[];
    navigation: InmodePanel_Generic_Navigate_Interface[];
};
export interface InmodePanel_NextGeneration_Inteface {
    picture?: {
        localFile: GatsbyImage_Interface
    };
    title?: string;
    text?: string;
    source?: string;
};
export interface  InmodePanel_SellingArg_Interface {
    picture?: {
        localFile: GatsbyImage_Interface
    };
    title?: string;
    arg?: string;
};
export interface  InmodePanel_SellingNext_Interface {
    picture?: {
        localFile: GatsbyImage_Interface
    };
    title?: string;
    text?: string;
    source?: string;
};

// Components

    

// Addon
export interface InmodePanel_Addon_AddonProductDescr_Interface {
    descr?: string;
    product?: InmodePanel_Product_Interface;
};
export interface InmodePanel_Addon_ProductPresentation_Interface {
    left_image?: {
        localFile: GatsbyImage_Interface
    };
    title_image?: GatsbyImage_Interface;
    appears_everywhere?: boolean;
    products?: InmodePanel_Product_Interface[];
    ProductPresentationTreats?: InmodePanel_Base_Treat_Interface[];
    Images?: InmodePanel_Base_Image_Interface[];
    AddonProductsDescr?: InmodePanel_Addon_AddonProductDescr_Interface[];
    title_text?: string;
};
export interface InmodePanel_Addon_Video_Interface {
    url?: string;
    poster?: {
        localFile: GatsbyImage_Interface
    };
};
export interface InmodePanel_Addon_WhatTreat_Interface {
    picture?: {
        localFile: GatsbyImage_Interface
    };
    title?: string;
    text?: string;
};

// Base
export interface InmodePanel_Base_Banner_Interface {
    left_img?: {
        localFile: GatsbyImage_Interface
    };
    right_img?: {
        localFile: GatsbyImage_Interface
    };
    left_video?: string;
    right_text?: string;
    mini?: {
        localFile: GatsbyImage_Interface
    };
};
export interface InmodePanel_Base_Image_Interface {
    image?: {
        localFile: GatsbyImage_Interface
    };
    product?: InmodePanel_Product_Interface;
};
export interface InmodePanel_Base_RelatedAddonTreat_Interface {
    treat_short?: string;
    product?: InmodePanel_Product_Interface;
    treatment?: InmodePanel_Treatment_Interface;
};
export interface InmodePanel_Base_SectionTitreText_Interface {
    title?: string;
    text?: string;
};
export interface InmodePanel_Base_Texte_Interface {
    texte?: string;
};
export interface InmodePanel_Base_Treat_Interface {
    treat_short?: string;
    product?: InmodePanel_Product_Interface;
};

// Generic
export interface InmodePanel_Generic_BeforeAfter_Interface {
    image?: {
        localFile: GatsbyImage_Interface
    };
    doctor?: string;
    text?: string;
};
export interface InmodePanel_Generic_ClinicalStudies_Interface {
    picture: {
        localFile: GatsbyImage_Interface
    };
    title: string;
    url: string;
    author: string;
    published_date: string;
    publication: string;
    addons: InmodePanel_Addon_Interface[];
};
export interface InmodePanel_Generic_Customer_Interface {
    Firstname?: string;
    Lastname?: string;
    Mail?: string;
    Phone?: string;
    Society?: string;
    Address?: string;
    Country?: string;
    ZIP?: string;
    City?: string;
};
export interface InmodePanel_Generic_Demo_Interface {
    picture?: {
        localFile: GatsbyImage_Interface
    };
    text?: string;
};
export interface InmodePanel_Generic_MenuParams_Interface {
    title: string;
    url: string;
    type: string;
    variant: string;
    internal_link: boolean | null;
};
export interface InmodePanel_Generic_Navigate_Interface {
    name?: string;
    url?: string;
};
export interface InmodePanel_Generic_SellingArgs_Interface {
    SectionTitle?: string;
    Arg?: InmodePanel_Base_Texte_Interface[];
    picture?: {
        localFile: GatsbyImage_Interface
    };
};
export interface InmodePanel_Generic_SellingNewGeneration_Interface {
    picture?: {
        localFile: GatsbyImage_Interface
    };
    text?: string;
    source?: string;
    title?: string;
};
export interface InmodePanel_Generic_Social_Interface {
    url?: string;
    name?: string;
    icon?: {
        localFile: GatsbyImage_Interface
    };
    position?: number;
};
export interface InmodePanel_Generic_Staff_Interface {
    picture?: {
        localFile: GatsbyImage_Interface
    };
    name?: string;
    position?: string;
    short_descr?: string;
};
export interface InmodePanel_Generic_WhatIs_Interface {
    picture?: {
        localFile: GatsbyImage_Interface
    };
    TitleText?: InmodePanel_Base_SectionTitreText_Interface[];
};

// Product
export interface InmodePanel_Product_BoughtArticle_Interface {
    Article?: number;
    Quantity?: number;
    Price: number;
    Name: string;
    Pack: string;
};
export interface InmodePanel_Product_Buyer_Interface {
    Firstname?: string;
    Lastname?: string;
    Phone?: string;
    Address?: string;
    Country?: string;
    ZIP?: string;
    City?: string;
    Society?: string;
};
export interface InmodePanel_Product_RelatedAddonTreatment_Interface {
    addon?: InmodePanel_Addon_Interface;
    treatment?: InmodePanel_Treatment_Interface;
    short?: InmodePanel_Base_Texte_Interface;
};
export interface InmodePanel_Product_WhatIsProduct_Interface {
    image?: {
        localFile: GatsbyImage_Interface
    };
    title?: string;
    text?: string;
    treatment?: InmodePanel_Treatment_Interface;
};

// Treat
export interface InmodePanel_Treat_Banner_Interface {
    picture?: {
        localFile: GatsbyImage_Interface
    };
    text?: string;
};

export interface InmodePanel_Testimonial_Interface {
    Content: string;
    Name: string;
    from: string;
    Clinic: string;
    Picture: {
        localFile: GatsbyImage_Interface
    };
}

export interface InmodePanel_Discount_Interface {
    discount: number;
    type: string;
    single_use: boolean;
    textual: boolean;
    text: string;
    articles: InmodePanel_Shop_Interface;
}

export interface InmodePanel_OurSpecialists_Interface {
    Picture: {
        localFile: GatsbyImage_Interface
    };
    Name: string;
    Description: string;
}

export interface InmodePanel_PressMedia_Interface {
    Picture: {
        localFile: GatsbyImage_Interface
    };
    Short: string;
    Description: string;
    URL: string;
}

// Blog Article

export interface InmodePanel_BlogArticle_Interface {
    strapiId: number;
    Title: string;
    ShortDescr: string;
    CustomUrl?: string;
    Element: InmodePanel_BlogArticleElement_Interface[];
    Thumbnail?: {
        localFile: GatsbyImage_Interface
    };
    VideoURL?: string
}

export interface InmodePanel_BlogArticleElement_Interface {
    Text: {
        text: string;
        type: string;
    }
    Image: {
        localFile: GatsbyImage_Interface;
    };
    Carousel: {
        localFile: GatsbyImage_Interface;
    }[];
}

///////////////////////

export interface Discount_Interface {
    id: number;
    discount: number;
    type: string;
    single_use: boolean;
    textual: boolean;
    text: string;
    articles: {
        id: string;
        price: number;
        reference: string;
    };
    is_ref(id:string):boolean;
}

export interface BlogArticle_Interface {
    id: string;
    hashid: string;
    ShortDescr: string;
    title: string;
    customUrl: string;
    content: any;
    Thumbnail: {
        localFile: GatsbyImage_Interface
    };
    is_ref(hashid:string):boolean;
}

export interface ArticleList {
    articles: Article_Interface[];
};

export interface Article_Interface {
    id: number;
    name: string;
    reference: string;
    quantity: number;
    pack_size: number;
    type: string;
    description?: string;
    pack_name():string;
    add(qnt:number):Article_Interface;
    remove(qnt:number):Article_Interface;
    is_ref(ref:string):boolean;
    price: number;
    discount: number;
    total():number;
};

export interface NameTable_Interface {
    tip: string[];
    canule: string[];
    kit: string[];
    pin: string[];
    unite: string[];
};

export interface Images_Interface {
    get_ratio(request:string): number;
    get_one(request:string): GatsbyImage_Interface;
    get_set(request:string[]): GatsbyImage_Interface[];
    resolve_img(request:string):string|undefined;
    resolve_img_set(request:string):string|undefined;
};

export interface External_GatsbyImage_Interface extends GatsbyImage_Interface {
    caption?: string;
    url?: string;
    localFile: GatsbyImage_Interface;
}

export interface GatsbyImage_Interface {
    ext?: string;
    extension?: string;
    childImageSharp?: {
        fixed: {
            base64?: string;
            srcWebp?: string;
            srcSetWebp?: string;
            aspectRatio?: number;
        }
        fluid: {
            base64?: string;
            srcWebp?: string;
            srcSetWebp?: string;
            aspectRatio?: number;
        }
        original: {
            width?: number;
            height?: number;
        }
        resize: {
            width?: number;
            height?: number;
        }
        ext?: string;
        extension?: string;
    };
    childrenImageSharp: {
        fixed: {
            base64?: string;
            srcWebp?: string;
            srcSetWebp?: string;
            aspectRatio?: number;
        }
        fluid: {
            base64?: string;
            srcWebp?: string;
            srcSetWebp?: string;
            aspectRatio?: number;
        }
        original: {
            width?: number;
            height?: number;
        }
        resize: {
            width?: number;
            height?: number;
        }
        ext?: string;
        extension?: string;
    }
    absolutePath?: string;
    publicURL?: string;
    url?: string;
    base64?: string;
    srcWebp?: string;
    srcSetWebp?: string;
    width?: number;
    height?: number;
};

export interface DiscountContext_Interface {
    discounts:any;
    discount_index(hashid:string):number;
    find_in_discounts(ref:string):Discount_Interface | undefined | null;
    nb_discounts():number;
}

export interface BlogArticleContext_Interface {
    articles:InmodePanel_BlogArticle_Interface[];
    article_index(hashid:string):number;
    find_in_articles(ref:string):InmodePanel_BlogArticle_Interface | undefined | null;
    nb_articles():number;
    readTime(article:InmodePanel_BlogArticle_Interface):number;
    articleLink(article:InmodePanel_BlogArticle_Interface):string;
}

export interface ProductsContext_Interface {
    product_navigation: {
        name: string;
        url: string;
    }[];
    addon_navigation: {
        name: string;
        url: string;
    }[];
    products: InmodePanel_Product_Interface[];
};

export interface MenusContext_Interface {
    header_left: {
        nodes: HeaderLeft_Interface[];
    };
    header_right: {
        nodes: HeaderRight_Interface[];
    };
    footer: {
        nodes: InmodePanel_Footer_Interface;
    };
    allStrapiProduct?:{
        nodes:  InmodePanel_Product_Interface[];
    };
    allStrapiTreatment?:{
        nodes:  InmodePanel_Treatment_Interface[];
    };
};

export interface Testimonial_Interface {
    id: string;
    hashid: string;
    title: string;
    customUrl: string;
    content: string;
    clinic: string;
    is_ref(id:string):boolean;
};

export interface OurSpecialist_Interface {
    Picture: {
        localFile: GatsbyImage_Interface
    };
    Name: string;
    Description: string;
};

export interface PressMedia_Interface {
    Picture: {
        localFile: GatsbyImage_Interface
    };
    Short: string;
    Description: string;
    URL: string;
};

export interface TestimonialContext_Interface {
    testimonials: Testimonial_Interface[];
    testimonial_index(hashid:string):number;
    find_in_testimonials(hashid:string):Testimonial_Interface | undefined | null;
    nb_testimonials():number;
};

export interface HeaderMenus_Interface {
    strapiId?: number;
    title?: string;
    url?: string;
    type?: string;
    variant?: string;
    container?: string;
    parent_menu?: boolean;
    internal_link?: boolean | null;
    menus?: InmodePanel_Menu_Interface[];
    products?: {
        id: number;
        position: number;
        MenuParams: InmodePanel_Generic_MenuParams_Interface;
        Icon: {
            localFile: GatsbyImage_Interface;
        } | undefined;
    }[];
    treatments?: {
        id: number;
        MenuParams: InmodePanel_Generic_MenuParams_Interface;
    }[];
    icon?: {
        localFile: GatsbyImage_Interface
    } | undefined;
    icon_hover?: {
        localFile: GatsbyImage_Interface
    } | undefined;
    mini_treatments?: {
        id: number;
        MenuParams: InmodePanel_Generic_MenuParams_Interface;
    }[];
    mini_products?: {
        id: number;
        MenuParams: InmodePanel_Generic_MenuParams_Interface;
    }[];
    mini_addons?: {
        id: number;
        MenuParams: InmodePanel_Generic_MenuParams_Interface;
    }[];
}

export interface HeaderLeft_Interface extends HeaderMenus_Interface {

};

export interface HeaderRight_Interface extends HeaderMenus_Interface {
    
};

export interface FlickityOptions_Interface {
    initialIndex?: number;
    cellAlign?: string;
    pageDots?: boolean;
    accessibility?: boolean;
    selectedAttraction?: number;
    friction?: number;
    percentPosition?: boolean;
    autoPlay?: boolean|number;
    wrapAround?: boolean;
    groupCells?: boolean|number,
    draggable?: boolean,
    freeScroll?: boolean,
    prevNextButtons?: boolean,
    adaptiveHeight?: boolean,
    imagesLoaded?: boolean,
};

export interface ColorExtractor_Interface {
    hex: string;
    red: number;
    green: number;
    blue: number;
    area: number;
    hue: number;
    saturation: number;
    lightness: number;
    intensity: number;
}