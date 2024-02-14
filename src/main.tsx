import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Link, Params, RouterProvider, createBrowserRouter, defer } from 'react-router-dom';
import Root from './layouts/Root.tsx';
import Signup from './routes/Signup.tsx';
import Login from './routes/Login.tsx';
import Home from './routes/Home.tsx';
import Dashboard from './layouts/Dashboard.tsx';
import Polls from './routes/dashboard/Polls.tsx';
import LandingPage from './layouts/LandingPage.tsx';
import Account from './routes/dashboard/Account.tsx';
import CreatePoll from './routes/dashboard/polls/CreatePoll.tsx';
import Appwrite from './services/Appwrite.ts';
import PollDetails from './routes/dashboard/polls/PollDetails.tsx';
import MakeVote from './routes/dashboard/polls/MakeVote.tsx';


const router = createBrowserRouter([
  {

    element: <Root />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
        children: [
          {
            index: true,
            element: <Home />
          },
          {
            path: "login",
            element: <Login />,
          },
          {
            path: "signup",
            element: <Signup />,
          },
        ]
      },
      {
        path: "dashboard",
        element: <Dashboard />,
        // handle: {
        //   crumb: () => <Link to="/dashboard">Polls</Link>
        // },
        children: [
          {
            path: "poll",
            element: <Polls />,
            // Code below gets polls made only by this user
            // loader: () => {
            //   const appwrite = new Appwrite()
            //   let result = appwrite.getCurrentUser()
            //     .then((user) => user.$id)
            //     .then((userID => appwrite.getUserPolls(userID)))

            //   return defer({ result })
            // }

            //Code below gets all polls
            loader: () => getAllPolls(),
            handle: {
              crumb: () => <Link to="/dashboard/poll">Polls</Link>
            },
          },
          {
            path: "poll/create",
            element: <CreatePoll />
          },
          {
            path: "poll/:pollID/vote",
            element: <MakeVote />,
            loader: ({ request, params }) => getPoll(params)
          },
          {
            path: "poll/:pollID",
            element: <PollDetails />,
            loader: ({ request, params }) => getFullPollData(params),
            handle: {
              crumb: () => <Link to="/dashboard/poll/:pollID">Poll Details</Link>
            }
          },

          {
            path: "account",
            element: <Account />,
            children: [

            ]
          }
        ]
      }
    ]
  },


]);

function getAllPolls() {
  const appwrite = new Appwrite();
  let result = appwrite.getAllPolls();
  return defer({ result });
}

function getFullPollData(params: Params) {
  const appwrite = new Appwrite();
  let result = appwrite.getFullPollData(params.pollID!);
  return defer({ result });
}

function getPoll(params: Params) {
  const appwrite = new Appwrite();
  let result = appwrite.getPoll(params.pollID!);
  return defer({ result });
}


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
