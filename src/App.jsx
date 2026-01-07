import { useState, useEffect } from "react";
// Make sure to import your css file if not already imported in index.js
// import './index.css'; 

const App = () => {
  const [Name, setName] = useState('');
  const [Contact, setContact] = useState('');
  
  // Initialize state from local storage safely
  const [Data, setData] = useState(() => {
    const savedData = localStorage.getItem('contactData');
    return savedData ? JSON.parse(savedData) : [];
  });

  // Save to local storage whenever Data changes
  useEffect(() => {
    localStorage.setItem('contactData', JSON.stringify(Data));
  }, [Data]);

  function handleSubmit(e) {
    e.preventDefault();
    if(!Name || !Contact) return; // Prevent empty submissions

    const newData = [...Data, { Name, Contact }];
    setData(newData);
    setName('');
    setContact('');
  }

  return (
    <main>
      {/* SECTION 1: THE FORM */}
      <section className="Formtype">
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <h2 style={{color: 'white'}}>New Contact</h2>
            <input 
              type="text" 
              placeholder="Enter Name" 
              value={Name} 
              onChange={(e) => setName(e.target.value)} 
            />
            <input 
              type="number" 
              placeholder="Phone Number" 
              value={Contact} 
              onChange={(e) => setContact(e.target.value)} 
            />
            <button>Add to Contacts</button>
          </form>
        </div>
      </section>

      {/* SECTION 2: THE PHONE */}
      <section className="phone-wrapper">
        <div className="phone">
          {/* Side Buttons */}
          <div className="button button-left-1"></div>
          <div className="button button-left-2"></div>
          <div className="button button-left-3"></div>
          <div className="button button-right"></div>

          {/* Screen */}
          <div className="screen">
            <div className="notch"></div>

            <div className="app-content">
              {/* Optional: Header inside phone */}
              <h3 style={{
                  color:'black', 
                  marginBottom:'10px', 
                  fontSize:'1.8rem', 
                  fontWeight: '800'
                }}>Contacts</h3>

              {Data.length === 0 ? (
                <p style={{color:'#999', textAlign:'center', marginTop:'50px'}}>No contacts yet</p>
              ) : (
                Data.map(function (item, index) {
                  return (
                    <div className="info" key={index}>
                      <div className="left-side">
                        {/* Avatar circle with first letter of name */}
                        <div className="avatar">
                          {item.Name.charAt(0).toUpperCase()}
                        </div>
                        <div className="contact-details">
                          <div className="name">{item.Name}</div>
                          <div className="No">{item.Contact}</div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            <div className="home-indicator"></div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default App