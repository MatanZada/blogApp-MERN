import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  userProfileAction,
  followUserAction,
  unfollowUserAction,
} from "../../../redux/slices/users/usersSlices";
import DateFormatter from "../../../utils/DateFormatter";
import LoadingComponent from "../../../utils/LoadingComponent";

export default function Profile() {
  const dispatch = useDispatch();
  const { id } = useParams();
  //   console.log(id);

  //user data from store
  const users = useSelector((state) => state.users);
  const {
    profile,
    profileLoading,
    profileAppErr,
    profileServerErr,
    followed,
    unFollowed,
    userAuth,
  } = users;

  //fetch user profile
  useEffect(() => {
    dispatch(userProfileAction(id));
  }, [id, dispatch, followed, unFollowed]);
  //   console.log(profile);

  //isLogin
  const isLoginUser = userAuth?._id === profile?._id;

  return (
    <>
      <div className="min-h-screen bg-green-600 flex justify-center items-center">
        {profileLoading ? (
          <LoadingComponent />
        ) : profileAppErr || profileServerErr ? (
          <h2 className="text-yellow-400 text-2xl">
            {profileServerErr} {profileAppErr}
          </h2>
        ) : (
          <div className="h-screen flex overflow-hidden bg-white">
            {/* Static sidebar for desktop */}

            <div className="flex flex-col min-w-0 flex-1 overflow-hidden">
              <div className="flex-1 relative z-0 flex overflow-hidden">
                <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none xl:order-last">
                  <article>
                    {/* Profile header */}
                    <div>
                      <div>
                        <img
                          className="h-32 w-full object-cover lg:h-48"
                          src={profile?.profilePhoto}
                          alt={profile?.firstName}
                        />
                      </div>
                      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
                          <div className="flex -mt-20">
                            <img
                              className="h-24 w-24 rounded-full  ring-4 ring-white sm:h-32 sm:w-32"
                              src={profile?.profilePhoto}
                              alt={profile?.firstName}
                            />
                          </div>
                          <div className="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
                            <div className=" flex flex-col 2xl:block mt-10 min-w-0 flex-1">
                              <h1 className="text-2xl font-bold text-gray-900 ">
                                {profile?.firstName} {profile?.lastName}
                                <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                                  {profile?.accountType}
                                </span>
                                {/* Display if verified or not */}
                                <span className="inline-flex ml-2 items-center px-3 py-0.5  rounded-lg text-sm font-medium bg-green-600 text-gray-300">
                                  Account Verified
                                </span>
                              </h1>
                              <p className="m-3 text-lg">
                                Date Joined: {""}
                                <DateFormatter date={profile?.createdAt} />{" "}
                              </p>
                              <p className="text-green-600 mt-2 mb-2">
                                {profile?.posts?.length} posts{" "}
                                {profile?.followers?.length} followers{" "}
                                {profile?.following?.length} following
                              </p>
                              {/* Who view my profile */}
                              <div className="flex items-center  mb-2">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="currentColor"
                                  className="h-5 w-5 "
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                                  />
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                  />
                                </svg>
                                <div className="pl-2">
                                  {profile?.viewedBy?.length}{" "}
                                  <span className="text-indigo-400 cursor-pointer ">
                                    Number of viewers{" "}
                                    {profile?.viewedBy?.length}
                                  </span>
                                </div>
                              </div>
                              {/* is login user */}
                              {/* Upload profile photo */}
                              {isLoginUser && (
                                <Link
                                  to={`/upload-profile-photo`}
                                  className="inline-flex justify-center w-48 px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                                    />
                                  </svg>
                                  <span>Upload Photo</span>
                                </Link>
                              )}
                            </div>

                            <div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
                              {/* // Hide follow button from the same */}
                              {!isLoginUser && (
                                <div>
                                  {profile?.isFollowing ? (
                                    <button
                                      onClick={() =>
                                        dispatch(unfollowUserAction(id))
                                      }
                                      className="mr-2 inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          d="M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
                                        />
                                      </svg>

                                      <span>Unfollow</span>
                                    </button>
                                  ) : (
                                    <button
                                      onClick={() =>
                                        dispatch(followUserAction(id))
                                      }
                                      type="button"
                                      className="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                                        />
                                      </svg>

                                      <span>Follow </span>
                                      <span className="pl-2">
                                        {profile?.followers?.length}
                                      </span>
                                    </button>
                                  )}

                                  <></>
                                </div>
                              )}
                              {/* Update Profile */}

                              <>
                                {isLoginUser && (
                                  <Link
                                    to={`/update-profile/${profile?._id}`}
                                    className="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth={1.5}
                                      stroke="currentColor"
                                      className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                                      />
                                    </svg>

                                    <span>Update Profile</span>
                                  </Link>
                                )}
                              </>
                            </div>
                          </div>
                        </div>
                        <div className="hidden sm:block 2xl:hidden mt-6 min-w-0 flex-1">
                          <h1 className="text-2xl font-bold text-gray-900 truncate">
                            {profile?.firstName} {profile?.lastName}
                          </h1>
                        </div>
                      </div>
                    </div>
                    {/* Tabs */}
                    <div className="mt-6 sm:mt-2 2xl:mt-5">
                      <div className="border-b border-red-900">
                        <div className="max-w-5xl mx-auto "></div>
                      </div>
                    </div>
                    <div className="flex justify-center place-items-start flex-wrap  md:mb-0">
                      <div className="w-full md:w-1/3 px-4 mb-4 md:mb-0">
                        <h1 className="text-center text-xl border-gray-500 mb-2 border-b-2">
                          Who viewed my profile : {profile?.viewedBy?.length}
                        </h1>

                        {/* Who view my post */}
                        <ul className="">
                          {profile?.viewedBy?.length <= 0 ? (
                            <h1>No Viewer</h1>
                          ) : (
                            profile?.viewedBy?.map((user) => (
                              <li>
                                <Link>
                                  <div className="flex mb-2 items-center space-x-4 lg:space-x-6">
                                    <img
                                      className="w-16 h-16 rounded-full lg:w-20 lg:h-20"
                                      src={user?.profilePhoto}
                                      alt={user?.firstName}
                                    />
                                    <div className="font-medium text-lg leading-6 space-y-1">
                                      <h3>
                                        {user?.firstName} {user?.lastName}
                                      </h3>
                                      <p className="text-indigo-600">
                                        {user?.accountType}
                                      </p>
                                    </div>
                                  </div>
                                </Link>
                              </li>
                            ))
                          )}
                        </ul>
                      </div>
                      {/* All my Post */}
                      <div className="w-full md:w-2/3 px-4 mb-4 md:mb-0">
                        <h1 className="text-center text-xl border-gray-500 mb-2 border-b-2">
                          My Post - {profile?.posts?.length}
                        </h1>
                        {/* Loop here */}
                        {profile?.posts?.length <= 0 ? (
                          <h2 className="text-center text-xl">No Post Found</h2>
                        ) : (
                          profile?.posts?.map((post) => (
                            <div className="flex flex-wrap  -mx-3 mt-3  lg:mb-6">
                              <div className="mb-2   w-full lg:w-1/4 px-3">
                                <Link>
                                  <img
                                    className="object-cover h-40 rounded"
                                    src={post?.image}
                                    alt="poster"
                                  />
                                </Link>
                              </div>
                              <div className="w-full lg:w-3/4 px-3">
                                <Link
                                  // to={`/post/${post?._id}`}
                                  className="hover:underline"
                                >
                                  <h3 className="mb-1 text-2xl text-green-600 font-bold font-heading">
                                    {post?.title}
                                  </h3>
                                </Link>
                                <p className="text-gray-600 truncate">
                                  {post?.description}
                                </p>

                                <Link
                                  className="text-indigo-500 hover:underline"
                                  to={`/posts/${post?._id}`}
                                >
                                  Read more
                                </Link>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </article>
                </main>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
