import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import {
//   blockUserAction,
//   unBlockUserAction,
// } from "../../../redux/slices/users/usersSlices";

const UsersListItem = (user) => {
  //dispatch
  const dispatch = useDispatch();
  //history
  const navigate = useNavigate();

  const sendMailNavigator = () => {
    navigate.push({
      pathname: "/send-mail",
      state: {
        email: user?.user?.email,
        id: user?.user?._id,
      },
    });
  };
  return (
    <>
      <div className="p-8 mb-4 bg-white shadow rounded">
        <div className="flex flex-wrap items-center -mx-4">
          <div className="w-full lg:w-3/12 flex px-4 mb-6 lg:mb-0">
            <img
              className="w-10 h-10 mr-4 object-cover rounded-full"
              src={user?.user?.profilePhoto}
              alt="profile "
            />
            <div>
              <p className="text-sm font-medium">
                {user?.user?.firstName} {user?.user?.lastName}
              </p>
              <p className="text-xs text-gray-500">{user?.user?.email}</p>
            </div>
          </div>
          <div className="w-1/2 lg:w-2/12 px-4 mb-6 lg:mb-0">
            <p className="py-1 px-2 text-xs text-purple-500 bg-purple-50 rounded-full">
              {user?.user?.accountType}
              {/* <span>{user?.user?.isBlocked && "Blocked"}</span> */}
            </p>
          </div>
          <div className="w-1/2 lg:w-2/12 px-4 mb-6 lg:mb-0">
            <p className="text-sm font-medium">
              <span className="text-base mr-2  text-bold text-yellow-500">
                {user.user?.followers?.length}
              </span>
              followers
            </p>
          </div>
          <div className="w-full flex lg:w-4/12 px-4  mb-6 lg:mb-0">
            <p className="inline-block py-1 px-2 mr-2 mb-1 lg:mb-0 text-xs border-2 rounded">
              <span className="text-base mr-2  boder-2 text-bold text-yellow-500">
                {user.user?.posts?.length} - Posts
              </span>
            </p>
            <Link
              to={`/profile/${user?.user?._id}`}
              className=" text-gray-600 inline-block py-1 px-2 text-center mr-2 mb-1 lg:mb-0 text-xs border-2 border-yellow-500 rounded hover:bg-green-600 hover:text-white"
            >
              Profile
            </Link>

            {user?.user?.isBlocked ? (
              <button
                // onClick={() => dispatch(unBlockUserAction(user?.user?._id))}
                className="inline-block py-1 px-2 text-center bg-gray-500 text-gray-300 mr-2 mb-1 lg:mb-0 text-xs border rounded"
              >
                unblock
              </button>
            ) : (
              <button
                // onClick={() => dispatch(blockUserAction(user?.user?._id))}
                className="inline-block py-1 px-2 text-center bg-red-600 text-gray-300 mr-2 mb-1 lg:mb-0 text-xs border rounded"
              >
                Block
              </button>
            )}

            <button
              onClick={sendMailNavigator}
              className="inline-flex  justify-center bg-green-700 px-2   border border-yellow-700 shadow-sm text-sm font-medium rounded-md text-gray-700  hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="-ml-1 mr-2 h-5 w-5 text-gray-200"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
              </svg>

              <span className="text-base mr-2  text-bold text-yellow-500">
                Message
              </span>
            </button>
          </div>
          <div className="w-full lg:w-1/12 px-4">
            <div className="flex items-center">
              {/* Send Mail */}
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UsersListItem;
