import { CompareToursCheckout } from "@/actions/compare.action";
import { useMutation } from "@tanstack/react-query";

const useCompareCheckout = () =>
  useMutation({
    mutationKey: ["checkout", "compare"],
    mutationFn: (payload: {
      tour_id: string;
      full_name: string;
      email: string;
    }) => CompareToursCheckout(payload),
  });

export default useCompareCheckout;
