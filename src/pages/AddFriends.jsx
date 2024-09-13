import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";

const AddFriends = () => {
  // data from redux
  const mainuser = useSelector((state) => state.prity.peraDitase);

  // Real-time database
  const db = getDatabase();

  // useState for array
  const [jonogon, upjonogon] = useState([]);
  const [one, tow] = useState(false);

  useEffect(() => {
    const starCountRef = ref(db, "users/");
    onValue(starCountRef, (snapshot) => {
      let bag = [];

      snapshot.forEach((notItem) => {
        if (notItem.val().uid !== mainuser.uid) {
          bag.push({ ...notItem.val(), key: notItem.key });
        }
      });

      // Update the state
      upjonogon(bag);
    });
  }, [db, mainuser.uid]);

  // button for send friend-request
  const addFrind = (thatFriend) => {
    set(push(ref(db, "friendRequastList/")), {
      senderId: mainuser.uid,
      senderName: mainuser.displayName,
      senderPhoto: mainuser.photoURL,
      ReseverId: thatFriend.uid,
      ReseverName: thatFriend.username,
      ReseverPhoto: thatFriend.profile_picture,
    });
    buttonchange();
  };

  // function to toggle the button state
  const buttonchange = () => {
    tow((prevState) => !prevState);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen w-[900px] bg-gradient-to-r from-[#71ffe3] via-[#fff] to-[#008cff] flex flex-col items-center py-10">
        <h2 className="text-3xl font-bold text-black w-full text-center pt-5 pb-5 mb-8 shadow-lg">
          All User
        </h2>
        <div className="w-full max-w-lg bg-white shadow-2xl rounded-lg p-6">
          {jonogon.map((sobpolapain) => (
            <div
              key={sobpolapain.key}
              className="flex items-center justify-between p-4 border-b border-gray-200 hover:bg-gray-100 transition duration-300 ease-in-out rounded-lg"
            >
              <div className="flex items-center">
                <img
                  src={sobpolapain?.profile_picture}
                  alt={sobpolapain?.username}
                  className="w-14 h-14 rounded-full object-cover border-2 border-purple-500 shadow-sm"
                />
                <span className="ml-5 text-gray-800 font-semibold text-lg">
                  {sobpolapain?.username}
                </span>
              </div>
              {one ? (
                <button
                  onClick={buttonchange}
                  className="bg-gradient-to-r from-green-400 active:scale-95 to-blue-500 text-white px-5 py-2 rounded-full shadow-lg hover:from-green-500 hover:to-blue-600 transform hover:scale-105 transition duration-300 ease-in-out"
                >
                  Cancel
                </button>
              ) : (
                <button
                  onClick={() => addFrind(sobpolapain)}
                  className="bg-gradient-to-r from-green-400 active:scale-95 to-blue-500 text-white px-5 py-2 rounded-full shadow-lg hover:from-green-500 hover:to-blue-600 transform hover:scale-105 transition duration-300 ease-in-out"
                >
                  Add Friend
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AddFriends;
