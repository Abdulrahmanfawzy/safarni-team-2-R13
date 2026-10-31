import { getProfileApi } from "@/api/profile.api";
import ProfileSidebar from "./_components/ProfileSidebar";

export default async function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userData = await getProfileApi();

  return (
    <div className="min-h-screen bg-white text-gray-800 p-4 md:p-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6 items-start">
        <ProfileSidebar user={userData.data!} />

        <section className="flex-1 w-full">{children}</section>
      </div>
    </div>
  );
}
