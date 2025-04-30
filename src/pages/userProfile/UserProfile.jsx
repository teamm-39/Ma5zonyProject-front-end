import AppBreadCrumb from "../../components/AppBreadCrumb";
import AppCard from "../../components/AppCard";
import UserProfileForm from "../../features/userProfile/UserProfileForm";

function UserProfile() {
  const items = [{ label: "لوحة التحكم", url: "/" }, { label: "الملف الشخصي" }];
  return (
    <>
      <AppCard>
        <AppBreadCrumb items={items}/>
        <UserProfileForm />
      </AppCard>
    </>
  );
}

export default UserProfile;
