import { getHomePosts } from "@/utils/supabase/queries";
import HomePosts from "../components/Home/HomePosts";
import { createClient } from "@/utils/supabase/server-client";

export const revalidate = 600;

export default async function Home() {
  const supabase = await createClient();
  const { data, error } = await getHomePosts(supabase)

  return (
    <div className="w-[80%] m-auto">
      <HomePosts posts={data!}/>
    </div>
  );
}
