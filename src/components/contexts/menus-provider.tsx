import React, { useContext } from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import MenusContext from "./menus-context";
import { MenusContext_Interface, HeaderTop_Interface, HeaderBottom_Interface } from '../interfaces';
import { _log, _trace } from '../../functions/logger';

// const _TYPES = ['text', 'image', 'button', 'card'];
// const _VARIANTS = ['single', 'title', 'content', 'dk_title', 'side_menu'];

export const useMenus = ():MenusContext_Interface => {
    return useContext(MenusContext);
}

const MenusProvider = ({ requested = "", children }:{ requested?:string, children:any }):React.Provider<MenusContext_Interface> => {
    const [datas]:MenusContext_Interface | any = React.useState(useStaticQuery(graphql`
        {
            header_top: allStrapiMenu(filter: {container: {eq: "header_top"}}) {
                nodes {
                    strapiId
                    title
                    url
                    type
                    variant
                    container
                    parent_menu
                    internal_link
                    menus {
                        id
                        title
                        url
                        type
                        variant
                    }
                    products {
                        id
                        position
                        MenuParams {
                            title
                            url
                            type
                            variant
                            internal_link
                        }
                        Icon {
                            localFile {
                                childImageSharp {
                                    fluid {
                                        srcWebp
                                        srcSetWebp
                                    }
                                }
                            }
                        }
                    }
                    treatments {
                        id
                        MenuParams {
                            title
                            url
                            type
                            variant
                            internal_link
                        }
                    }
                    icon {
                        localFile {
                            childImageSharp {
                                fluid {
                                    srcWebp
                                    srcSetWebp
                                }
                            }
                            publicURL
                        }
                    }
                    icon_hover {
                        localFile {
                            childImageSharp {
                                fluid {
                                    srcWebp
                                    srcSetWebp
                                }
                            }
                            publicURL
                        }
                    }
                }
            }
            header_bottom: allStrapiMenu(filter: {container: {eq: "header_bottom"}}) {
                nodes {
                    strapiId
                    title
                    url
                    type
                    variant
                    container
                    parent_menu
                    internal_link
                    menus {
                        id
                        title
                        url
                        type
                        variant
                    }
                    products {
                        id
                        position
                        MenuParams {
                            title
                            url
                            type
                            variant
                            internal_link
                        }
                        Icon {
                            localFile {
                                childImageSharp {
                                    fluid {
                                        srcWebp
                                        srcSetWebp
                                    }
                                }
                            }
                        }
                    }
                    treatments {
                        id
                        MenuParams {
                            title
                            url
                            type
                            variant
                            internal_link
                        }
                    }
                    mini_treatments {
                        id
                        MenuParams {
                            title
                            url
                            type
                            variant
                            internal_link
                        }
                    }
                    icon {
                        localFile {
                            childImageSharp {
                                fluid {
                                    srcWebp
                                    srcSetWebp
                                }
                            }
                            publicURL
                        }
                    }
                    icon_hover {
                        localFile {
                            childImageSharp {
                                fluid {
                                    srcWebp
                                    srcSetWebp
                                }
                            }
                            publicURL
                        }
                    }
                }
            }
            footer: strapiFooter {
                logo {
                    localFile {
                        childImageSharp {
                            fluid {
                                srcWebp
                                srcSetWebp
                            }
                        }
                    }
                }
                address
                phone
                mail
                social {
                    icon {
                        localFile {
                            publicURL
                        }
                    }
                    name
                    url
                    position
                }
                navigation {
                    name
                    url
                }
            }
            allStrapiProduct(filter: {Addons: {elemMatch: {Page_addon: {eq: true}}}}) {
                nodes {
                    strapiId
                    position
                    Addons {
                        id
                        MenuParams {
                            title
                            url
                            type
                            variant
                            internal_link
                        }
                    }
                }
            }
            allStrapiTreatment {
                nodes {
                    strapiId
                    MenuParams {
                        title
                        url
                        type
                        variant
                        internal_link
                    }
                }
            }
        }
    `));

    _log(datas);

    const array_to_object = (_array:Array<any>):HeaderTop_Interface | HeaderBottom_Interface | {} => {
        if(!_array) {
            return {};
        }
        return Object.fromEntries(
            _array.map((elem, index) => {
                return [index, {...elem, index: index}];
            })
        );
    }

    const recursive_process = (_object:HeaderTop_Interface[] | HeaderBottom_Interface[], main:HeaderTop_Interface[] | HeaderBottom_Interface[]) => {
        Object.keys(_object).map((elem:number) => {
            if(_object[elem].menus.length) {
                _object[elem].menus = _object[elem].menus.map((menu) => {
                    return {
                        ...menu,
                        'menus': menu.menus || [],
                        'products': menu.products || [],
                        'treatments': menu.treatments || [],
                        'mini_treatments': menu.mini_treatments || [],
                        'id': menu.id || menu.strapiId,
                        'parent': elem,
                        ...(Object.values(_object).find(ob => ob.title == menu.title) ?? {})
                    };
                });
                recursive_process(array_to_object(_object[elem].menus), main);
            }
            if(_object[elem].products.length) {
                let temp = new Array(_object[elem].products.length);
                for(let i = 0; i < _object[elem].products.length; i++) {
                    temp[_object[elem].products[i].position - 1] = _object[elem].products[i];
                }
                _object[elem].menus = _object[elem].menus.concat(temp.map((product) => {
                    product.menus = datas.allStrapiProduct.nodes.map((_product) => {
                        let temp = [];
                        if(JSON.stringify([product.id, product.strapiId].sort()) === JSON.stringify([_product.id, _product.strapiId].sort())) {
                            for(const addon in _product.Addons) {
                                temp.push({
                                    ..._product.Addons[addon].MenuParams,
                                    'id': _product.Addons[addon].id || _product.Addons[addon].strapiId,
                                    'menus': _product.Addons[addon].menus || [],
                                    'products': _product.Addons[addon].products || [],
                                    'treatments': _product.Addons[addon].treatments || [],
                                    'mini_treatments': _product.Addons[addon].mini_treatments || [],
                                });
                            };
                        }
                        return temp;
                    }).filter(elem => elem.length)[0];
                    recursive_process(array_to_object(product.menus), main);
                    return {
                        ...product.MenuParams,
                        'menus': product.menus || [],
                        'products': product.products || [],
                        'treatments': product.treatments || [],
                        'mini_treatments': product.mini_treatments || [],
                        'icon': product.Icon.localFile.childImageSharp?.fluid || null,
                        'id': product.id || product.strapiId,
                        'parent': elem
                    };
                }));
            }
            if(_object[elem].treatments.length) {
                _object[elem].menus = _object[elem].menus.concat(_object[elem].treatments.map((treatment) => {
                    return {
                        ...treatment.MenuParams,
                        'menus': treatment.menus || [],
                        'products': treatment.products || [],
                        'treatments': treatment.treatments || [],
                        'mini_treatments': treatment.mini_treatments || [],
                        'id': treatment.id || treatment.strapiId,
                        'parent': elem
                    };
                }));
            }
            if(_object[elem].mini_treatments && _object[elem].mini_treatments.length) {
                _object[elem].mini_treatments = _object[elem].mini_treatments.map((elem) => {
                    return {...elem, ...elem.MenuParams};
                });
            }
        });
    }

    const resolve_dependance = (_object:HeaderTop_Interface[] | HeaderBottom_Interface[], main:HeaderTop_Interface[] | HeaderBottom_Interface[]) => {
        Object.keys(_object).map((menu) => {
            if(_object[menu].parent_menu) {
                _object[menu].menus.map((_elem, key) => {
                    if(main[_elem.id || _elem.strapiId] && main[_elem.id || _elem.strapiId].title === _elem.title) {
                        _object[menu].menus[key] = {..._elem, ...main[_elem.id || _elem.strapiId]};
                        // _elem = {..._elem, ...main[_elem.id || _elem.strapiId].menus};
                    }
                });
            }
        })
    }

    const process_menu = (list: HeaderTop_Interface[] | HeaderBottom_Interface[]) => {
        let temp = array_to_object(list);
        recursive_process(temp, temp);
        resolve_dependance(temp, temp);
        return Object.entries(temp).map((menu) => {
            menu[1].products = [];
            menu[1].treatments = [];
            if(menu[1].parent_menu) {
                return menu[1];
            }
            return false;
        }).filter(menu => menu);
    }

    const socials = ['facebook', 'instagram', 'youtube', 'linkedin'];

    // EXPLAIN - Sort socials to the end of the list
    const [menusHeaderTop] = React.useState(process_menu([
        ...datas.header_top.nodes.filter((node:HeaderTop_Interface) => socials.indexOf(node.title) < 0),
        ...datas.header_top.nodes.filter((node:HeaderTop_Interface) => socials.indexOf(node.title) > -1),
    ]));
    const [menusHeaderBottom] = React.useState(process_menu(datas.header_bottom.nodes.map(elem => elem)));
    const [menusFooter] = React.useState(datas.footer);
    
    return (
        <MenusContext.Provider
            value={{
                'header_top': menusHeaderTop,
                'header_bottom': menusHeaderBottom,
                'footer': menusFooter,

            }}
        >
            {children}
        </MenusContext.Provider>
    );
}

export default MenusProvider;