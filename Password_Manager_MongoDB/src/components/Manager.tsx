import { createElement, useEffect, useRef, useState, type ChangeEvent } from "react";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from 'uuid';
import "react-toastify/dist/ReactToastify.css";

type PasswordEntry = {
  site: string;
  username: string;
  password: string;
  id?: string;
  _id?: string;
};

const LordIcon = (props: Record<string, unknown>) =>
  createElement("lord-icon", props);

const Manager = () => {
  const eyeRef = useRef<HTMLImageElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState<PasswordEntry>({
    site: "",
    username: "",
    password: "", id: uuidv4()
  });
  const [passwordArray, setPasswordArray] = useState<PasswordEntry[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

 const getPasswords = async () => {
  try {
    console.log("Fetching passwords from backend...");
    let req = await fetch("http://localhost:3000/api/passwords");
    
    if (!req.ok) {
      console.error("Failed to fetch passwords. Status:", req.status);
      toast.error("Failed to load passwords from database");
      return;
    }
    
    let passwords = await req.json();
    console.log("Passwords fetched successfully:", passwords);
    console.log("Password count:", passwords.length);
    
    setPasswordArray(passwords);
  } catch (error) {
    console.error("Error fetching passwords:", error);
    toast.error("Error loading passwords. Check backend connection.");
  }
};

useEffect(() => {
  getPasswords(); // Page load hotay hi function call hoga
}, []);

  const showPassword = () => {
    const input = passwordRef.current;
    const image = eyeRef.current;
    if (!input || !image) return;

    if (input.type === "password") {
      image.src = "/icons/eyecross.png";
      input.type = "text";
    } else {
      image.src = "/icons/eye.png";
      input.type = "password";
    }
  };

 const savePassword = async () => {
  try {
    console.log("Save clicked. Form:", form);
    
    if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
      
      if (editingIndex !== null) {
        // UPDATE existing password
        const passwordId = passwordArray[editingIndex]._id;
        console.log("Updating ID:", passwordId);
        
        let res = await fetch(`http://localhost:3000/api/password/${passwordId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ site: form.site, username: form.username, password: form.password }) 
        });

        console.log("Update response:", res.status);
        
        if (res.ok) {
          const updatedPassword = await res.json();
          console.log("Updated:", updatedPassword);
          const updatedArray = [...passwordArray];
          updatedArray[editingIndex] = updatedPassword;
          setPasswordArray(updatedArray);
          setForm({ site: "", username: "", password: "", id: uuidv4() });
          setEditingIndex(null);
          toast.success("Password updated successfully", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
          });
        } else {
          const error = await res.text();
          console.error("Update failed:", error);
          toast.error("Failed to update: " + error);
        }
      } else {
        // ADD new password
        console.log("Adding new password");
        let res = await fetch("http://localhost:3000/api/passwords", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ site: form.site, username: form.username, password: form.password }) 
        });

        console.log("Add response:", res.status);
        
        if (res.ok) {
          const savedPassword = await res.json();
          console.log("Saved:", savedPassword);
          setPasswordArray([...passwordArray, savedPassword]);
          setForm({ site: "", username: "", password: "", id: uuidv4() });
          toast.success("Password saved successfully", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
          });
        } else {
          const error = await res.text();
          console.error("Save failed:", error);
          toast.error("Failed to save: " + error);
        }
      }
    } else {
      console.warn("Validation failed - fields must be > 3 chars");
      toast.error("Error: Fields must be longer than 3 characters!");
    }
  } catch (error) {
    console.error("Error in savePassword:", error);
    toast.error("An unexpected error occurred. Check console.");
  }
};


  
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const copyText = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Ignore clipboard permission issues
    }
  };

  const startEditing = (id: string) => {
    const entry = passwordArray.find(item => item._id === id);
    if (!entry) return;
   
    setForm({ site: entry.site, username: entry.username, password: entry.password, id: entry._id });
    setEditingIndex(passwordArray.findIndex(item => item._id === id));
  };

 const deletePassword = async (id: string) => {
  let c = confirm("Do you really want to delete this password?");
  if (c) {
    // 1. Backend se delete karna
    let res = await fetch(`http://localhost:3000/api/passwords/${id}`, {
      method: "DELETE"
    });

    // 2. Frontend state se us password ko filter kar ke nikaal dena
    if (res.ok) {
      setPasswordArray(passwordArray.filter(item => item._id !== id));
      toast.success("Password deleted successfully", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      }); 
    }
  }
};


    

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="absolute top-0 z-[-2] bg-green-50 h-screen w-screen bg-green-50 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      <div className="container mx-auto px-3 sm:px-4 md:px-6 max-w-4xl min-h-[85vh] pb-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center">
          <span className="text-green-500">&lt;</span>
          PassX
          <span className="text-green-500">/&gt;</span>
        </h1>
        <p className="text-green-900 text-base sm:text-lg text-center">
          Your own Password Manager
        </p>

        <div className="flex flex-col p-3 sm:p-4 gap-3 sm:gap-4 pt-6 sm:pt-8">
          <input
            type="text"
            name="site"
            onChange={handleChange}
            value={form.site}
            className="rounded-full border border-green-500 px-4 py-2 sm:py-2.5 w-full text-sm sm:text-base"
            placeholder="Enter Website URL"
          />

          <div className="flex flex-col md:flex-row gap-3 sm:gap-4">
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              className="w-full rounded-full border border-green-500 px-4 py-2 sm:py-2.5 text-sm sm:text-base"
              placeholder="Enter Username"
            />

            <div className="relative w-full">
              <input
                ref={passwordRef}
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full rounded-full border border-green-500 px-4 py-2 sm:py-2.5 text-sm sm:text-base"
                placeholder="Enter Password"
              />
              <span
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm cursor-pointer"
                onClick={showPassword}
              >
                <img
                  ref={eyeRef}
                  className="w-5 h-5"
                  src="/icons/eye.png"
                  alt="show"
                />
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={savePassword}
            className="w-full sm:w-fit bg-green-500 hover:bg-green-400 rounded-full px-6 sm:px-8 py-2 flex items-center gap-2 justify-center mx-auto"
          >
            <LordIcon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
              colors="primary:#000000"
            />
            {editingIndex === null ? "Add Password" : "Update Password"}
          </button>
        </div>

        <div className="passwords mt-2">
          <h2 className="text-xl sm:text-2xl font-bold py-4">Your Passwords</h2>
          {passwordArray.length === 0 && <div className="text-sm sm:text-base">No Passwords to Show!</div>}
          {passwordArray.length > 0 && (
            <div className="overflow-x-auto rounded-md border border-gray-200">
              <table className="w-full min-w-[640px] border-collapse">
                <thead className="bg-green-800 text-white">
                  <tr>
                    <th className="py-2 px-3 sm:px-4 text-left">Site</th>
                    <th className="py-2 px-3 sm:px-4 text-left">Username</th>
                    <th className="py-2 px-3 sm:px-4 text-left">Password</th>
                    <th className="py-2 px-3 sm:px-4 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-green-100">
                  {passwordArray.map((item) => {
                    if (!item._id) {
                      console.warn("Password entry missing _id:", item);
                      return null;
                    }
                    return (
                      <tr key={item._id}>
                        <td className="py-2 px-3 sm:px-4 text-left align-top">
                          <div className="flex flex-wrap items-center gap-2">
                            <a
                              href={item.site}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="break-all hover:text-green-700"
                            >
                              {item.site}
                            </a>
                            <div
                              className="cursor-pointer"
                              onClick={() => copyText(item.site)}
                            >
                              <LordIcon
                                src="https://cdn.lordicon.com/iykgtsxz.json"
                                trigger="hover"
                                style={{
                                  width: "25px",
                                  height: "25px",
                                  paddingTop: "3px",
                                  paddingLeft: "3px",
                                }}
                              />
                            </div>
                          </div>
                        </td>
                        <td className="py-2 px-3 sm:px-4 text-left align-top">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="break-all">{item.username}</span>
                            <div
                              className="cursor-pointer"
                              onClick={() => copyText(item.username)}
                            >
                              <LordIcon
                                src="https://cdn.lordicon.com/iykgtsxz.json"
                                trigger="hover"
                                style={{
                                  width: "25px",
                                  height: "25px",
                                  paddingTop: "3px",
                                  paddingLeft: "3px",
                                }}
                              />
                            </div>
                          </div>
                        </td>
                        <td className="py-2 px-3 sm:px-4 text-left align-top">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="break-all">{item.password}</span>
                            <div
                              className="cursor-pointer"
                              onClick={() => copyText(item.password)}
                            >
                              <LordIcon
                                src="https://cdn.lordicon.com/iykgtsxz.json"
                                trigger="hover"
                                style={{
                                  width: "25px",
                                  height: "25px",
                                  paddingTop: "3px",
                                  paddingLeft: "3px",
                                }}
                              />
                            </div>
                          </div>
                        </td>
                        <td className="py-2 px-3 sm:px-4 text-left align-top">
                          <div className="flex items-center gap-2">
                            <span
                              className="cursor-pointer mx-1"
                              onClick={() => startEditing(item._id)}
                            >
                              <LordIcon
                                src="https://cdn.lordicon.com/gwlusjdu.json"
                                trigger="hover"
                                style={{ width: "25px", height: "25px" }}
                              />
                            </span>
                            <span
                              className="cursor-pointer mx-1"
                              onClick={() => deletePassword(item._id)}
                            >
                              <LordIcon
                                src="https://cdn.lordicon.com/skkahier.json"
                                trigger="hover"
                                style={{ width: "25px", height: "25px" }}
                              />
                            </span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
