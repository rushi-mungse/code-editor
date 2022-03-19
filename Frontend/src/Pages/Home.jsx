const Home = () => {
  return (
    <div className="homePageWrapper flexStyle">
      <div className="formWrapper flexStyle">
        <h1 className="heading">Code Editor</h1>
        <p className="mainLabel">Paste Invitation Room Id</p>
        <input type="text" placeholder="ROOM ID" className="inputTag" />
        <input type="text" placeholder="User Name" className="inputTag" />
        <button className="btn btnJoin">JOIN</button>
        <p className="inviteBtn">
          If you don't have an invite then create &nbsp;
          <a href="" target={"_blank"}>
            New Room
          </a>
        </p>
      </div>
      <footer className="footer">
        Built with 🖤 by
        <a href="https://github.com/rushi-mungse"> Rushikesh Mungse</a>
      </footer>
    </div>
  );
};

export default Home;
