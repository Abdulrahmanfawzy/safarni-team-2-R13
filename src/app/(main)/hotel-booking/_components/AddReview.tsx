import { Button } from "@/components/ui/button";
import { DialogContent } from "@/components/ui/dialog";

const AddReview = () => {
  return (
    <form>
      <DialogContent>
        <div className="space-y-1">
          <h2 className="text-base text-gray-900 font-normal">Add review</h2>
          <textarea
            className="bg-gray-100 rounded-xl w-full resize-none size-40 p-4 placeholder:text-gray-600 placeholder:text-base   focus:outline-none border border-gray-300"
            placeholder="Write your review here..."
          />
          <div>
            
          </div>
        </div>
        <Button className={"w-full text-base"}>Submit Review</Button>
      </DialogContent>
    </form>
  );
};

export default AddReview;
