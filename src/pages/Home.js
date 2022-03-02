import LeaderBoard from "../components/LeaderBoard/LeaderBoard";
import ProfileCardModal from "../components/Profile/ProfileCardModal";
import Background from "../components/ui/Background";

const Home = () => {
  return (
    <>
      <ProfileCardModal />
      <Background>
        <p>Home Page</p>
      </Background>
      <LeaderBoard />
      <div>
        <a
          href="https://www.flaticon.com/free-icons/dinosaur"
          title="dinosaur icons"
        >
          Dinosaur icons created by Freepik - Flaticon
        </a>
      </div>
    </>
  );
};

export default Home;
