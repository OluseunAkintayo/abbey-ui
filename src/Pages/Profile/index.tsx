import Layout from '@/components/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Profiletab from './Profiletab';
import FollowerTab from './FollowerTab';
import FollowingTab from './FollowingTab';

const Profile = () => {
  return (
    <Layout>
      <div className='p-4 mx-auto'>
        <Tabs defaultValue="profile" className="">
          <TabsList className='w-full sm:w-fit'>
            <TabsTrigger className='md:w-[144px]' value="profile">Profile</TabsTrigger>
            <TabsTrigger className='md:w-[144px]' value="followers">Followers</TabsTrigger>
            <TabsTrigger className='md:w-[144px]' value="following">Following</TabsTrigger>
          </TabsList>
          <TabsContent value="profile">
            <Profiletab />
          </TabsContent>
          <TabsContent value="followers"><FollowerTab /></TabsContent>
          <TabsContent value="following">
            <FollowingTab />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  )
}

export default Profile;