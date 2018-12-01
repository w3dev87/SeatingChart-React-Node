import ConstructorItem from './constructor-item';
import { Accordion, AccordionItem } from 'react-sanfona';

export default ({ items, getSvgBasedOnType }) => {
  return (
    <Accordion allowMultiple>
      { items &&
        items.map((category, idx) => {
          const { categoryName, categoryId, items: categoryItems } = category;
          return (
            <AccordionItem
              bodyClassName='no-transition'
              title={ categoryName }
              slug={ categoryId }
              key={ idx }
            >
              {
                categoryItems.map((object, idx_cat) => {
                  return (
                    <div 
                      key={ idx_cat }
                    >
                      <ConstructorItem
                        { ...object }
                        categoryId={ categoryId }
                        image={ getSvgBasedOnType(object.type) }
                      />
                    </div>
                  )
                })
              }
            </AccordionItem>
          )
        })
      }
    </Accordion>
  );
}
