import React, { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import * as client from "../../Account/client";
import PeopleDetails from "./Details";

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  loginId: string;
  section: string;
  role: string;
  lastActivity: string;
  totalActivity: number;
}

interface PeopleTableProps {
  users?: User[];
}

export default function PeopleTable({ users: propUsers }: PeopleTableProps) {
  const [users, setUsers] = useState<User[]>(propUsers || []);
  const [isLoading, setIsLoading] = useState(propUsers ? false : true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Only fetch users if no users were passed as props
    if (!propUsers) {
      const fetchUsers = async () => {
        try {
          setIsLoading(true);
          const fetchedUsers = await client.findAllUsers();
          setUsers(fetchedUsers);
          setIsLoading(false);
        } catch (err) {
          setError("Failed to fetch users");
          setIsLoading(false);
          console.error("Error fetching users:", err);
        }
      };

      fetchUsers();
    }
  }, [propUsers]);

  // If prop users change, update state
  useEffect(() => {
    if (propUsers) {
      setUsers(propUsers);
    }
  }, [propUsers]);

  if (isLoading) {
    return <div>Loading users...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div id="wd-people-table">
      <PeopleDetails />
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Login ID</th>
            <th>Section</th>
            <th>Role</th>
            <th>Last Activity</th>
            <th>Total Activity</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td className="wd-full-name text-nowrap">
                <Link to={`/Kanbas/Account/Users/${user._id}`} className="text-decoration-none">
                  <FaUserCircle className="me-2 fs-1 text-secondary" />
                  <span className="wd-first-name">{user.firstName}</span>
                  <span className="wd-last-name">{user.lastName}</span>
                </Link>
              </td>
              <td className="wd-login-id">{user.loginId}</td>
              <td className="wd-section">{user.section}</td>
              <td className="wd-role">{user.role}</td>
              <td className="wd-last-activity">{user.lastActivity}</td>
              <td className="wd-total-activity">{user.totalActivity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}