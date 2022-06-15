const getRecipiantEmail = (users,usersLogged) => {
return (
    users?.filter((useFilter)=> useFilter !== usersLogged?.email )[0]
    );
}

export default getRecipiantEmail