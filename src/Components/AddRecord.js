import { useState, useEffect } from "react";
import "../saas/AddRecord.css";
import storage from "../firebase/config";

function AddRecord() {
  const [data, setData] = useState({
    name: "",
    continent: "",
    flag: "",
    rank: 0,
  });
  const [URL, setURL] = useState();
  const [continents, setContinents] = useState([]);
  const [formErrors, setFormErrors] = useState({
    name: "",
    continent: "",
    flag: "",
    rank: "",
  });

  const [countries, setCountries] = useState([]);
  let isSubmit = false;

  useEffect(async () => {
    const res = await fetch(
      "https://upload-download-img-default-rtdb.firebaseio.com/data.json"
    );
    const result = await res.json();
    // console.log(Object.values(result).map((item)=>item.name))
    setCountries(Object.values(result).map((item) => item.name));
    setContinents(
      Array.from(new Set(Object.values(result).map((item) => item.continent)))
    );
  }, []);

  async function onSubmit(e) {
    e.preventDefault();
    // setIsSubmit(true);
    isSubmit = true;
    let validationRes = validate(data);
    setFormErrors(validationRes);

    console.log("Reached outside the add record code");
    console.log(Object.values(validationRes).length);
    if (Object.keys(validationRes).length == 0 && isSubmit) {
      console.log("Reached inside the add record code");
      let downloadURL = "";
      //add image
      const fileRef = storage.ref().child(`images/${data.flag.name}`);
      const uploadTask = fileRef.put(data.flag);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          if (progress == "100") alert("Data entered successfully!");
          // if(progress=='100')   M.toast({html: 'Image added successfully!', classes: 'green darken-1 '});;
        },
        (error) => {
          console.log(error);
        },
        async () => {
          downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
          // setURL(await uploadTask.snapshot.ref.getDownloadURL());

          console.log("File available at", downloadURL);

          //add remaining data
          let finalData = { ...data };
          finalData.flag = downloadURL;
          console.log(finalData);

          const res = await fetch(
            "https://upload-download-img-default-rtdb.firebaseio.com/data.json",
            {
              method: "POST",
              header: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(finalData),
            }
          );

          console.log("Response ", res);

          finalData = { name: "", continent: "", flag: "", rank: 0 };
          setData(finalData);
          isSubmit = false;
        }
      );
    } //validation if block
  } //onSubmit

  //validating the form
  function validate(data) {
    let errors = {};

    //name validation
    if (countries.includes(data.name)) {
      errors.name = "This country already exists";
    } else if (!data.name) {
      errors.name = "Please enter the name of the country";
    } else if (data.name.length < 3 || data.name.length > 20) {
      errors.name =
        "Lenght of the name of country should be in between 3 to 20 characters ";
    }

    //continent validation
    if (!data.continent) {
      errors.continent = "Please enter the continent";
    }
    //Flag
    if (!data.flag) {
      errors.flag = "Please select the flag";
    } else if (Math.round(data.flag.size / 1024) / 1024 > 4) {
      errors.flag = "Size of image is more than 4MB";
      console.log(data.flag);
    } else if (data.flag.type != "image/jpg" && data.flag.type != "image/png") {
      errors.flag = "Type of image should be only jpg or png";
      console.log(data.flag);
    }
    //Rank
    if (!data.rank) {
      errors.rank = "Please enter the rank of the country";
    }
    console.log("Reached at the end of this validation code");
    return errors;
  }

  function handleChange(e) {
    let name = e.target.name;
    let value;
    if (name == "flag") value = e.target.files[0];
    else value = e.target.value;
    setData({ ...data, [name]: value });
  }

  return (
    <div className="container">
      <form onSubmit={onSubmit} className="form">
        <label>Name </label>
        <input
          type="text"
          name="name"
          onChange={handleChange}
          autoComplete="off"
          value={data.name}
        />
        <br />
        <br />
        <p style={{ color: "red" }}>{formErrors.name}</p>
        <label>Continent </label>
        <select value={data.continent} name="continent" onChange={handleChange}>
          <option>-select-</option>
          {continents.map((item, index) => (
            <option key={index}>{item}</option>
          ))}
        </select>
        <p style={{ color: "red" }}>{formErrors.continent}</p>
        <br />
        <br />
        <label>Flag </label> <br />
        <br />
        <input type="file" name="flag" onChange={handleChange} />
        <p style={{ color: "red" }}>{formErrors.flag}</p>
        <br />
        <br />
        <label>Rank </label>
        <input
          value={data.rank}
          type="number"
          name="rank"
          onChange={handleChange}
        />
        <p style={{ color: "red" }}>{formErrors.rank}</p>
        <br />
        <br />
        <button className="sbt-btn">Submit </button>
      </form>
    </div>
  );
}

export default AddRecord;
