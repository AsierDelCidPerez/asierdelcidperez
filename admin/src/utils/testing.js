

export const fastTesting = adminService => {

    const admin = adminService
    admin.adminConsole.listUsers().then(res => console.log(res.data))
}


