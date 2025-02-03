import { BreadCrumb } from 'primereact/breadcrumb';
function AppBreadCrumb(prop) {
  const items = prop.items;
  return (
    <>
      <div>
      <BreadCrumb model={items} />
      </div>
    </>
   );
}

export default AppBreadCrumb;