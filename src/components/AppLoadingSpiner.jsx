import { ProgressSpinner } from 'primereact/progressspinner';

function AppLoadingSpinner(prop) {
  return (
    <>
      {prop.isLoading && (
        <div className='loading-spiner'>
          <ProgressSpinner aria-label='جارى التحميل..' />
        </div>
      )}
    </>
  );
}

export default AppLoadingSpinner;
