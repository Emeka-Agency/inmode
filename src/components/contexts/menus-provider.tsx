import React, { useContext } from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import MenusContext from "./menus-context";
import { MenusContext_Interface, HeaderLeft_Interface, HeaderRight_Interface, InmodePanel_Menu_Interface } from '../interfaces';

// const _TYPES = ['text', 'image', 'button', 'card'];
// const _VARIANTS = ['single', 'title', 'content', 'dk_title', 'side_menu'];

export const useMenus = ():MenusContext_Interface => {
    return useContext(MenusContext);
}

const MenusProvider = ({ requested = "", children }:{ requested?:string, children:any }):React.Provider<MenusContext_Interface> => {
    const [datas]:[MenusContext_Interface, React.Dispatch<MenusContext_Interface>] = React.useState(useStaticQuery(graphql`
    {
        header_left: allStrapiMenu(filter: {container: {eq: "header_top"}}) {
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
                  Name
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
                  Name
                  MenuParams {
                    title
                    url
                    type
                    variant
                    internal_link
                  }
                }
                mini_addons {
                  id
                  Name
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
            }
        }
        header_right: allStrapiMenu(filter: {container: {eq: "header_bottom"}}) {
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
                  Name
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
                  Name
                  MenuParams {
                    title
                    url
                    type
                    variant
                    internal_link
                  }
                }
                mini_addons {
                  id
                  Name
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
    }`));

    const array_to_object = (_array:Array<any>):HeaderLeft_Interface | HeaderRight_Interface => {
        if(!_array || !Array.isArray(_array)) {
            return {};
        }
        _array = _array.filter(elem => elem);
        return Object.fromEntries(
            _array.map((elem) => {
                return [elem.strapiId || elem.id, elem];
            })
        );
    }

    const recursive_process = (_object:HeaderLeft_Interface | HeaderRight_Interface, main:HeaderLeft_Interface | HeaderRight_Interface) => {
        Object.keys(_object).map((elem:number) => {
            if(_object[elem].menus.length) {
                _object[elem].menus = _object[elem].menus.map((menu) => {
                    if(_object[elem].title == "Select a country") {
                        console.log(_object[elem].menus.map(el => el.icon));
                    }
                    return {
                        ...menu,
                        'menus': menu.menus || [],
                        'products': menu.products || [],
                        'treatments': menu.treatments || [],
                        'mini_treatments': menu.mini_treatments || [],
                        'mini_addons': menu.mini_addons || [],
                        // 'icon': menu.icon,
                        'id': menu.id || menu.strapiId,
                        'parent': elem
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
                    product.menus = datas.allStrapiProduct?.nodes.map((_product) => {
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
                                    'mini_addons': _product.Addons[addon].mini_addons || [],
                                    'icon': product.Icon || null,
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
                        'mini_addons': product.mini_addons || [],
                        'icon': product.Icon || null,
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
                        'mini_addons': treatment.mini_addons || [],
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
            if(_object[elem].mini_addons && _object[elem].mini_addons.length) {
                _object[elem].mini_addons = _object[elem].mini_addons.map((elem) => {
                    return {...elem, ...elem.MenuParams};
                });
            }
        });
    }

    const resolve_dependance = (_object:HeaderLeft_Interface[] | HeaderRight_Interface[], main:HeaderLeft_Interface[] | HeaderRight_Interface[]) => {
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

    const process_menu = (list: HeaderLeft_Interface[] | HeaderRight_Interface[]) => {
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

    const [menusHeaderLeft] = React.useState(process_menu(datas.header_left.nodes));
    const [menusHeaderRight] = React.useState(
      process_menu(datas.header_right.nodes.map(elem => elem))
      .sort((a:any, b:any) => b.url == "/contact" ? -1 : 0)
    );
    const [menusFooter] = React.useState(datas.footer);
    
    return (
        <MenusContext.Provider
            value={{
                'header_left': menusHeaderLeft,
                'header_right': menusHeaderRight,
                'footer': menusFooter,

            }}
        >
            {children}
        </MenusContext.Provider>
    );
}

export default MenusProvider;