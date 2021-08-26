import React, { ReactChild, useContext } from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import { _sort_html_list, _sort_object } from '../../functions/sort';

import {
    hashString,
} from 'react-hash-string';

import '../interfaces';
import {
    InmodePanel_Testimonial_Interface,
    TestimonialContext_Interface,
    Testimonial_Interface,
} from '../interfaces';
import TestimonialContext from './testimonial-context';

export const useTestimonial = ():TestimonialContext_Interface => {
    return useContext(TestimonialContext);
}

const TestimonialProvider = ({ requested = "", children }:{requested:string, children:ReactChild}):React.Provider<TestimonialContext_Interface> => {

    const [testimonials] = React.useState(useStaticQuery(graphql`
    {
        allStrapiTestimonial {
          nodes {
            strapiId
            Name
            from
            Picture {
              localFile {
                publicURL
                childImageSharp {
                  fluid {
                    srcWebp
                    srcSetWebp
                  }
                }
              }
            }
            Clinic
            Content
          }
        }
      }
      
    `).allStrapiTestimonial.nodes);

    const [testimonials_length]:[number, React.Dispatch<number>] = React.useState(testimonials.length);

    const testimonial_base = (hashid:string, qnt:number):Testimonial_Interface => {
        return {
            id: testimonials[hashid].strapiId,
            hashid: createHashid(testimonials[hashid].strapiId),
            title: testimonials[hashid].Title,
            customUrl: testimonials[hashid].CustomUrl,
            content: testimonials[hashid].Content,
            clinic: testimonials[hashid].Clinic,
            is_ref(hashid:string):boolean {return hashid === this.hashid;},
            // 'delete': (function() {
            //     // console.log("HARA KIRI KIRI !")
            //     delete this;
            // })
        };
    }


    const testimonial_index = (hashid:string):number => {
        return testimonials.map((item:Testimonial_Interface, key:number) => {
            return item.is_ref(hashid) ? key : 0;
        }).reduce((a:number, b:number) => {return a + b;});
    }

    const find_in_testimonials = (hashid:string):Testimonial_Interface | undefined | null => {
        if(!hashid) {
            return null;
        }
        if(typeof hashid != 'string') {
            return null;
        }
        return testimonials[hashid] || null;
    }


    const nb_testimonials = ():number => {
        return testimonials_length;
    }

    const createHashid = (_id:string):string => {
        return hashString(_id).toString();
    };

    return (
        <TestimonialContext.Provider
            value={{
                testimonials: testimonials,
                testimonial_index: testimonial_index,
                find_in_testimonials: find_in_testimonials,
                nb_testimonials: nb_testimonials,
            }}
        >
            {children}
        </TestimonialContext.Provider>
    );
}

export default TestimonialProvider;

