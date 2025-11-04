import { getHomePosts, getUserInfo } from "@/utils/supabase/queries";
import HomePosts from "../components/Home/HomePosts";
import { createClient } from "@/utils/supabase/server-client";
import AccountLinks from "../components/AccountLinks";
import { User } from "lucide-react";

export const revalidate = 600;

export default async function Home() {
  const supabase = await createClient();
  const { data, error } = await getHomePosts(supabase)
  const { data: { user } } = await supabase.auth.getUser();

  let userInfo;

  if (user) {
    const { data } = await getUserInfo(supabase, user.id);
    userInfo = data;
  }

  return (
    <div className="m-auto flex flex-row">
      <div className="hidden fixed md:block w-[25%] h-[85vh]">
        <div className="flex flex-col justify-center items-center my-5 h-full">
          {user && userInfo 
            ?
            <div className="flex flex-col items-center justify-center h-[30%]">
              <div className={`bg-gradient-to-r from-[#5865f2] to-[#ff99cc] p-7 flex items-center justify-center h-3 w-3 rounded-full text-white uppercase`}>{userInfo?.username[0]}</div>
              <div className="text-xl font-bold my-5">@{userInfo?.username}</div>
            </div>
            :
            <div className="flex items-center">
              <User size={100} className="text-white"/>
            </div>
          }
          <div className="my-5 h-[50%] flex items-center">
            <div>
              <AccountLinks user={user} />
            </div>
          </div>
        </div>
      </div>

      <div>      
        <HomePosts posts={data!}/>
      </div>
    </div>
  );
}
