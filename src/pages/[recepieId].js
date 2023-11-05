import { particularRecipeData } from "@/api/recipes";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function RecepieDetails(props) {
  const router = useRouter();
  const recepieId = router.query.recepieId

  console.info({
    query: router.query,
    props: props
  })

  useEffect(() => {
    (async () => {
      await fetchRecepieDetails(recepieId);
    })();
  }, []);

  async function fetchRecepieDetails(recepieId) {
    console.info();
    const result = await particularRecipeData(recepieId);
    console.info({
      result,
    });
  }

  // const router = useRouter();
  // console.log({ router });
  return <p>Recipe: </p>;
}
