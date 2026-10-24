import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RoomAbout from "./RoomAbout";
import RoomGallery from "./RoomGallery";
import RoomReviews from "./RoomReviews";

const tabs = [
  { value: "about", label: "About" },
  { value: "gallery", label: "Gallery" },
  { value: "review", label: "Review" },
];

const tabsContent = [
  {
    value: "about",
    content: <RoomAbout />,
  },
  {
    value: "gallery",
    content: <RoomGallery />,
  },
  {
    value: "review",
    content: <RoomReviews />,
  },
];

const RoomDetailsTabs = () => {
  return (
    <Tabs defaultValue="about" className="w-full">
      <TabsList className="grid h-auto w-full grid-cols-3 rounded-none bg-transparent">
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {tabsContent.map((tab) => (
        <TabsContent key={tab.value} value={tab.value} className="mt-6">
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default RoomDetailsTabs;
