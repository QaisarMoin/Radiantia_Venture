import { useState } from "react";

export const ContactFrom = () => {
  const [data, setData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(""); // To handle success/error messages

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name: e.target[0].value,
      email: e.target[1].value,
      message: e.target[2].value,
    };

    try {
      const response = await fetch('http://localhost:5000/api/user/Contact/form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log(result, "result");
      

      if (response.ok) {
        setStatus("Message sent successfully!");
        setData({ name: "", email: "", message: "" }); // Reset form
      } else {
        setStatus(result.message || "An error occurred. Please try again.");
      }
    } catch (error) {
      setStatus("Server error. Please try again.");
      console.error('Error:', error);
    }
  };

  return (
    <>
      {/* <!-- BEGIN DISCOUNT --> */}
      <div className='discount discount-contacts js-img' style={{ backgroundImage: `url('/assets/img/discount-bg3.jpg')` }}>
        <div className='wrapper'>
          <div className='discount-info'>
            <span className='saint-text'>write to us</span>
            <span className='main-text'>leave a message</span>
            <p>
              Write to us if you have any questions, we will definitely contact you and find a solution.
            </p>
            <form onSubmit={handleSubmit}>
              <div className='box-field'>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Enter your name'
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                />
              </div>
              <div className='box-field'>
                <input
                  type='email'
                  className='form-control'
                  placeholder='Enter your email'
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                />
              </div>
              <div className='box-field box-field__textarea'>
                <textarea
                  className='form-control'
                  placeholder='Enter your message'
                  value={data.message}
                  onChange={(e) => setData({ ...data, message: e.target.value })}
                ></textarea>
              </div>
              <button type='submit' className='btn'>Send</button>
            </form>

            {/* Status message */}
            {status && <p>{status}</p>}
          </div>
        </div>
      </div>
      {/* <!-- DISCOUNT EOF   --> */}
    </>
  );
};
