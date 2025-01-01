
import '../../CSS/MyProfile.css'
import ProfileCard from '../../components/ProfileCard/ProfileCard'

function App() {

  return (
    <div className="container">
      <ProfileCard
        name="HAri Singhe"
        mobile="+91 98765 43210"
        email="john.doe@example.com"
        imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjZirTv3YUaHSe-VVIQzwXUHXxb8mnJ-krbg&s"
      />
    </div>
  )
}

export default App

