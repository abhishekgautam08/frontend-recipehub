import { useRouter } from "next/router";

export default function recipeId() {
  const router = useRouter();
  console.log({ router });
  return <p>Recipe: {router.query.recipeId}</p>;
}
