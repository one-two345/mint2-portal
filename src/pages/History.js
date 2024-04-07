
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa"; // Importing the search icon
import Logo from "../images/Logo.jpg";
import { Carousel } from "react-bootstrap";
import "../App.css"

axios.defaults.withCredentials = true;

const History = () => {
  const [acceptedProject, setAcceptedProject] = useState([]);

  useEffect(() => {
    axios
      .get("https://research-portal-server-9.onrender.com/resources/history")
      .then((response) => {
        const parsedData =
          typeof response.data === "string"
            ? JSON.parse(response.data)
            : response.data;

        const sortedAcceptedProjects = parsedData.sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );

        setAcceptedProject(sortedAcceptedProjects);
      })
      .catch((error) => {
        console.error("Error fetching accepted projects:", error);
      });
  }, []);
  // get file name
  function getFileNameFromPath(filePath) {
    const parts = filePath.split(/[\\/]/); // Split the path using either / or \
    return parts[parts.length - 1]; // Get the last part, which is the file name
  }

  // handle dowload

  const handleDownload = (fileUrl, fileName) => {
    axios({
      url: fileUrl,
      method: "GET",
      responseType: "blob", // Ensure the response type is set to blob
    })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileName); // Set the file name and extension
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => {
        console.error("Error downloading file:", error);
        // Handle the error, maybe show a message to the user
      });
  };
  function searchItem(e) {
    let searchText = e.value.toLowerCase();
    let titles2 = Array.from(document.getElementsByClassName("card-title"));
    let contents = Array.from(
      document.getElementsByClassName("card-text text-muted")
    );
    let titles = titles2.concat(contents);
    let parent = null;
    Array.from(titles).forEach(function (title1) {
      if (title1.innerText.toLowerCase().indexOf(searchText) > -1) {
        title1.parentElement.parentElement.parentElement.parentElement.parentElement.style.display =
          "";
        parent =
          title1.parentElement.parentElement.parentElement.parentElement
            .parentElement;
        console.log(parent);
      } else {
        if (
          parent ===
          title1.parentElement.parentElement.parentElement.parentElement
            .parentElement
        ) {
          title1.parentElement.parentElement.parentElement.parentElement.parentElement.style.display =
            "";
        } else {
          title1.parentElement.parentElement.parentElement.parentElement.parentElement.style.display =
            "none";
        }
      }
    });
  }

  // const handleExploreClick = (id) => {
  //  console.log(id)
  //   window.location.href = `/achivment/${id}`;
  // };
  return (
    <div className="d-flex flex-column align-items-center mt-3 ml-5 mr-5" >
      <div className="container">
        <div className="row mt-5 quickCard" style={{ borderRadius: "15px" }}>
          <div className="col-md-6" style={{ display: "flex", flexDirection: "column", textAlign: 'center', marginTop: "30px", alignItems: "center"}}>
            <h1 className="roll-in-left" style={{ fontSize: "50px", textAlign: "center" }}>Our History</h1>
            <p style={{ textAlign: "justify", color: "black" }}>Embarking on a journey of digital transformation, the Ethiopian Ministry of Innovation and Technology (MinT) has
                witnessed a remarkable evolution from its establishment in 1975 to the present day.
           <br /><br />
              The introduction of groundbreaking government initiatives marked a turning point, propelling the nation towards widespread
              adoption of information and communication technologies (ICT). With each passing year, the MinT's unwavering commitment to
              innovation has paved the way for a brighter digital future, empowering Ethiopia to thrive in the digital age.</p>
            <p className="btn" style={{ marginTop: "20px", fontSize: "20px" }}>
              {/* <Link className="quick-links">
                Discover our past achievements
              </Link> */}
            </p>
          </div>
          <div className="col-md-6">
            <div style={{ width: "100%", margin: "auto", marginTop: "20px", borderRadius: "15px", overflow: "hidden" }}>
              <Carousel style={{ borderRadius: "15px" }}>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="https://scontent.fadd2-1.fna.fbcdn.net/v/t39.30808-6/424860358_744840527836695_776117035628600907_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_ohc=fPU0XNPvd6UAb5dTbQ8&_nc_ht=scontent.fadd2-1.fna&cb_e2o_trans=t&oh=00_AfCv88_MT9O3eXgVu1ivI0XNLVIvjbgV7ynkAI_kaivuBw&oe=6616F12E"
                    alt="First slide"
                    style={{ width: "100%", height: "auto" }}
                  />
                  <Carousel.Caption>
                    <p style={{ color: "white" }}>Prime Minister Abiy Ahmed (Dr.)'s main thoughts on "Ethiopian Start Up National Status"</p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="https://pbs.twimg.com/media/GJnWGrcXMAAcKsp?format=jpg&name=large"
                    alt="Second slide"
                    style={{ width: "100%", height: "auto" }}
                  />
                  <Carousel.Caption>
                    <p style={{ color: "white" }}>Dr. Belete Mola, who made an opening speech on the current review of Digital Ethiopia 2025 strategy</p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="https://scontent.fadd2-1.fna.fbcdn.net/v/t39.30808-6/417698878_723209679999780_3421765219837723358_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=5f2048&_nc_ohc=Ft0zqShTbvwAb7Hy8Bg&_nc_ht=scontent.fadd2-1.fna&cb_e2o_trans=t&oh=00_AfCJyIWH6TEvpF4O87v2-N2uF8IUxiEIuTTzt3-LlNyQxA&oe=661722CF"
                    alt="Third slide"
                    style={{ width: "100%", height: "auto" }}
                  />
                  <Carousel.Caption>
                    <p style={{ color: "white" }}>Collaboration between Ministry of innovation and technology and GIZ</p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="https://scontent.fadd2-1.fna.fbcdn.net/v/t39.30808-6/420496916_744908874496527_4673134507655620982_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=5f2048&_nc_ohc=e6DLUM0uXzEAb4SE51K&_nc_ht=scontent.fadd2-1.fna&cb_e2o_trans=t&oh=00_AfAz89F1RGD0SolD_gDrZ73sFXNYTkxuBS6CEO0llt9IIA&oe=6616FAEE"
                    alt="Fourth slide"
                    style={{ width: "100%", height: "auto" }}
                  />
                  <Carousel.Caption>
                    <p style={{ color: "white" }}>Ethiopia is working to be part of the 2028 unmanned landing mission on the moon by the foreigners</p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="https://scontent.fadd2-1.fna.fbcdn.net/v/t39.30808-6/419327315_736973695290045_7878015930729396104_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=2WbI2Um5ndsAb6D1Y-E&_nc_ht=scontent.fadd2-1.fna&cb_e2o_trans=t&oh=00_AfA7bCMt7U3aZ9CtAzEjrE4tRQP74a2OWJMRCh1G6Tr2ng&oe=6616FF25"
                    alt="Fifth slide"
                    style={{ width: "100%", height: "auto" }}
                  />
                  <Carousel.Caption>
                    <p style={{ color: "white" }}>Ethio Robo Robotics Education and Competition Center in collaboration with the Ministry of Innovation and Technology.</p>
                  </Carousel.Caption>
                </Carousel.Item>
              </Carousel>
            </div>
          </div>
        </div>
  
        <div className="my-5">
          <h2 className="font-weight-bold text-center">Time line of Events</h2>
        </div>
  
        <div className="card_history card mb-5 m-1" style={{ maxWidth: "65rem", margin: "0 auto", height: "30rem" }}>
          <div className="d-flex justify-content-center align-items-center h-100">
            <img
              className="kenburns-top"
              src="https://scontent-ams4-1.xx.fbcdn.net/v/t39.30808-6/434710449_740806234906791_6697716713902025575_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=xR9kkxBlzl4Ab7rSLfP&_nc_ht=scontent-ams4-1.xx&oh=00_AfDhfMSEC-TOwBLab9kyDOIzr8J6KDpVt5vNt-8rKYRJSA&oe=6618F06D"
              style={{ width: "100%", height: "100%" }}
              alt="Event"
            />
          </div>
        </div>
      </div>
  
      <h1 className="m-5" id="5">
        Explore Our Recent Researches and Innovations
      </h1>
      <div className="container mb-5">
        <div className="row">
          {acceptedProject.map((project, index) => (
            <div className="col-md-4" key={index} style={{ marginTop: "30px" }}>
              <div
                className="card-history_innovation card"
                id={`col${index + 1}`}
              >
                <div className="card-body text-center">
                  <a
                    href={`/achivment/${project._id}`}
                  >
                    <img
                      src={`${project.imagePath
                        .replace(/\//g, "\\")
                        .split("public\\")
                        .join("")}`}
                      className="card-img-top rounded-top"
                      alt={`Accepted Project ${index + 1}`}
                      style={{
                        width: "100%",
                        height: "200px",
                        objectFit: "cover",
                      }} // Adjust image size here
                    />
                    <h5 className="card-title" >{project.title}</h5>
                    <h6 className="card-Investigator my-2" style={{color: "black"}}>
                      <b>Principal Investigator</b>: {project.p_investigator}
                    </h6>
                    <p style={{color: "black"}} className="card-text">
                      {project.description.substring(0, 20)}...
                    </p>
                    <h6 style={{color: "black"}} className="card-Investigator my-2">
                      <b>Funding Source(s):</b> {project.funding_source}
                    </h6>
                    <h6 style={{color: "black"}} className="card-Investigator my-2">
                      <b>Author:</b> {project.author}
                    </h6>
                    <p     
                      className="d-block mx-auto"
                      style={{
                        color: "white",
                        backgroundColor: "black",
                        alignSelf: "center",
                        borderRadius: "5px",
                      }}
                    >
                      Explore
                    </p> 
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  
};

export default History;
