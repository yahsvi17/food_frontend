import React, { useState } from 'react';
import { useAuth } from "../context/AuthProvider"; // Import useAuth
import bm from '../image/bb sabji.jpg';
import ud from '../image/undhiyu.jpg';
import st from '../image/sevtatema.jpg';
import ro from '../image/ringan olo.jpg';
import cd from '../image/curd.jpg';
import kk from '../image/khichdii.jpg';
import mk from '../image/mkhichdi.jpg';
import gk from '../image/gkadhi.jpg';
import dd from '../image/daldhokli.jpg';
import dr from '../image/dalr.jpg';
import pr from '../image/rice.jpg';
import rp from '../image/raspuri.jpg';
import ms from '../image/mshro.jpg';
import mp from '../image/masalap.jpg';

function Custmization() {
  const [searchTerm, setSearchTerm] = useState("");
  const [authUser] = useAuth(); // Get the authUser
  const [showLoginModal, setShowLoginModal] = useState(false); // State for login modal

  const Card = ({ title, price, imgSrc }) => {
    const [quantity, setQuantity] = useState(0);

    const handleIncrease = () => {
      setQuantity(quantity + 1);
    };

    const handleDecrease = () => {
      if (quantity > 0) {
        setQuantity(quantity - 1);
      }
    };

    const handleAddToCart = () => {
      if (!authUser) {
        setShowLoginModal(true); // Show login modal if not logged in
        return;
      }

      if (quantity > 0) {
        const cartItem = {
          title,
          price: parseFloat(price.replace('₹', '').replace('/-', '')),
          qty: quantity,
          imgSrc
        };
        const existingCart = getCookie("cartData") || [];
        const updatedCart = [...existingCart, cartItem];
        updateCookie(updatedCart);
        setQuantity(0); // Reset quantity after adding to cart

        alert(`${title} added to the cart !!`);
      }
    };

    function getCookie(name) {
      const cookies = document.cookie.split("; ");
      for (let cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split("=");
        if (cookieName === name) {
          return JSON.parse(decodeURIComponent(cookieValue));
        }
      }
      return [];
    }

    function updateCookie(updatedItems) {
      document.cookie = `cartData=${encodeURIComponent(JSON.stringify(updatedItems))}; max-age=3600; path=/`;
    }

    return (
      <div className="card dark:text-white bg-base-100 w-80 sm:w-96 shadow-xl hover:scale-105 dark:bg-slate-900 border border-white">
      <figure className="relative h-64 overflow-hidden">
        <img
          src={imgSrc}
          alt={title}
          className="object-cover w-full h-full transition-transform duration-500 ease-in-out transform hover:scale-110 hover:translate-x-2 hover:-translate-y-2"
        />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{title}</h2>
          <p className="text-lg">{price}</p>
          <div className="flex items-center gap-2 mt-4">
            <button
              className="btn bg-[#4ade80] btn-sm dark:text-white"
              onClick={handleDecrease}
              disabled={quantity === 0}
            >
              -
            </button>
            <span className="text-sm">{quantity}</span>
            <button
              className="btn bg-[#4ade80] btn-sm dark:text-white"
              onClick={handleIncrease}
            >
              +
            </button>
          </div>
          <div className="card-actions justify-end mt-4">
            <button className="btn bg-[#4ade80] hover:bg-[#4ade80]" onClick={handleAddToCart}>
              Add
            </button>
          </div>
        </div>
      </div>
    );
  };

  const cardsData = [
    { title: "Bhindi Masala", price: "₹50/-", imgSrc: bm },
    { title: "Undhiyu", price: "₹70/-", imgSrc: ud },
    { title: "Sev Tameta", price: "₹40/-", imgSrc: st },
    { title: "Ringan Oro", price: "₹40/-", imgSrc: ro },
    { title: "Curd", price: "₹40/-", imgSrc: cd },
    { title: "Khichdi Kadhi", price: "₹40/-", imgSrc: kk },
    { title: "Masala Khichdi", price: "₹50/-", imgSrc: mk },
    { title: "Gujarati Kadhi", price: "₹35/-", imgSrc: gk },
    { title: "Dal Dhokli", price: "₹40/-", imgSrc: dd },
    { title: "Dal Rice", price: "₹40/-", imgSrc: dr },
    { title: "Pulav Rice", price: "₹40/-", imgSrc: pr },
    { title: "Ras Puri", price: "₹50/-", imgSrc: rp },
    { title: "Moong Dal Shiro", price: "₹70/-", imgSrc: ms },
    { title: "Masala Papad", price: "₹30/-", imgSrc: mp }
  ];

  // Filter cards based on search term
  const filteredCards = cardsData.filter((card) =>
    card.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex flex-col items-center justify-center mt-10 pt-[80px]">
        <h1 className="text-2xl font-algerian text-dark-green">
          ~~~ Customisation ~~~
        </h1>
        <p className="text-md text-dark-green text-center mt-4">
          Customize your meal with our variety of options!
        </p>
      </div>
     

      {/* Search bar */}
      <div className="flex justify-center mt-6">
        <input
          type="text"
          className="input input-bordered text-black w-64"
          placeholder="Search customization items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Display filtered cards */}
      <div className="flex flex-wrap justify-center mt-10 gap-6">
        {filteredCards.length > 0 ? (
          filteredCards.map((card, index) => (
            <Card
              key={index}
              title={card.title}
              price={card.price}
              imgSrc={card.imgSrc}
            />
          ))
        ) : (
          <p className="text-lg text-gray-500">No items match your search.</p>
        )}
      </div>

    

      {/* Login Modal */}
      {showLoginModal && (
        <dialog id="my_modal_3" className="modal modal-open">
          <div className="modal-box dark:text-black">
            <h2 className="text-xl font-bold mb-4">Please Sign Up</h2>
            <p className="mb-4">You need to Register yourself to add items to the cart.</p>
            <div className="flex justify-center mt-6">
              <button>
                <a
                  href="/user/signup"
                  className="text-black cursor-pointer btn bg-[#4ade80] hover:bg-[#4ade80]"
                >
                  SignUp
                </a>
              </button>&nbsp;
              <button
                className="text-black cursor-pointer btn bg-[#4ade80] hover:bg-[#4ade80]"
                onClick={() => setShowLoginModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
       <div className="text-center">
          <button className="btn btn-block">
            <a
              href="/roti"
              className="flex items-center bg-dark-green text-white px-10 py-6 mt-10 rounded-md duration-300 cursor-pointer space-x-2"
            >
              ADD ROTI
            </a>
          </button>
        </div>
      
    </div>
    
  );
}

export default Custmization;
