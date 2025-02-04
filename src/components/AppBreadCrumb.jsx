import { BreadCrumb } from 'primereact/breadcrumb';
import { Link } from 'react-router-dom';
function AppBreadCrumb(prop) {
  const items = prop.items.map((item) => {
    if (item.url) {
      return {
        ...item,
        template: (item) => <Link className='bread-link' to={item.url}>{item.label}</Link>
      };
    }
    return {
      ...item,
      template: (item) => <span className='bread-curent'>{item.label}</span>
    };
  })
  return (
    <>
      <div>
      <BreadCrumb model={items} />
      </div>
    </>
   );
}

export default AppBreadCrumb;