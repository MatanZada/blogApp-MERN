import { Link } from "react-router-dom";
import Moment from "react-moment";
import { deleteCommentAction } from "../../redux/slices/comments/commentSlices";
import { useDispatch, useSelector } from "react-redux";

export default function CommentsList({ comments }) {
  const user = useSelector((state) => state?.users);
  const { userAuth } = user;
  const isLoginuser = userAuth?._id;
  //   console.log(comments);
  //dispatch
  const dispatch = useDispatch();
  return (
    <div>
      <ul className="divide-y bg-gray-700 w-96 divide-gray-200 p-3 mt-5">
        <div className="text-gray-400">{comments?.length} Comments</div>
        <>
          {comments?.length <= 0 ? (
            <h1 className="text-yellow-400 text-lg text-center">No comments</h1>
          ) : (
            comments?.map((comment) => (
              <>
                <li key={comment?._id} className="py-4  w-full">
                  <div className="flex space-x-3">
                    <img
                      className="h-6 w-6 rounded-full"
                      src={comment?.user?.profilePhoto}
                      alt=""
                    />
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <Link to={`/profile/${comment?.user?._id}`}>
                          <h3 className="text-sm font-medium text-green-400">
                            {comment?.user?.firstName} {comment?.user?.lastName}
                          </h3>
                        </Link>

                        <p className="text-bold text-yellow-500 text-base ml-5">
                          {/* <Moment fromNow ago>
                      {comment?.createdAt}
                    </Moment> */}

                          <Moment fromNow ago>
                            {comment?.createdAt}
                          </Moment>
                        </p>
                      </div>
                      <p className="text-sm text-gray-400">
                        {comment?.description}
                      </p>
                      {/* Check if is the same user created this comment */}

                      {isLoginuser === comment?.user?._id ? (
                        <p class="flex">
                          <Link
                            to={`/update-comment/${comment?._id}`}
                            class="p-3"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="h-5 mt-3 text-yellow-300"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                              />
                            </svg>
                          </Link>
                          <button
                            onClick={() =>
                              dispatch(deleteCommentAction(comment?._id))
                            }
                            class="ml-3"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="h-5 mt-3 text-red-600"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                              />
                            </svg>
                          </button>
                        </p>
                      ) : null}
                    </div>
                  </div>
                </li>
              </>
            ))
          )}
        </>
      </ul>
    </div>
  );
}
