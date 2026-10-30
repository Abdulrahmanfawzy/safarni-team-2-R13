import { CompareToursCheckout } from "@/actions/compare.action";
import { useMutation } from "@tanstack/react-query";

const useCompareCheckout = () =>
  useMutation({
    mutationKey: ["checkout", "compare"],
    mutationFn: (payload: {
      tour_id: string;
      full_name: string;
      email: string;
      team: 1 | 2;
    }) => CompareToursCheckout(payload),
  });

export default useCompareCheckout;
