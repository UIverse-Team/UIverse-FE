import AdAlertSetting from '@/components/auth/edit-profile/AdAlertSetting'
import Addresses from '@/components/auth/edit-profile/Addresses'
import EditProfile from '@/components/auth/edit-profile/EditProfile'
import { getUserData } from '@/serverActions/auth/edit-profile/actions'

const EditProfilePage = async () => {
  const userData = await getUserData()

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* 회원정보수정 */}
      <EditProfile userData={userData} />
      {/* 주소록 */}
      <Addresses />
      {/* 마케팅 및 광고 알림 설정 */}
      <AdAlertSetting />
    </div>
  )
}

export default EditProfilePage
