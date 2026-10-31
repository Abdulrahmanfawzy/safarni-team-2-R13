import { getProfileApi } from "@/api/profile.api";
import ProfileInfoForm from "../_components/ProfileInfoForm";
import ProfileCard from "../_components/ProfileCard";

export default async function ProfileInfoPage() {
  const useData = await getProfileApi();

  return (
    <ProfileCard title="Personal Information">
      {/* Main Container Card */}

      <h1 className="text-xl font-semibold text-center text-gray-800 mb-8"></h1>

      <ProfileInfoForm userInfo={useData.data!} />
    </ProfileCard>
  );
}
