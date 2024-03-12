export enum BaseRoutes {
    Home = "/",
    Login = "/login",
    Register = "/register",
    Dossiers = "/dossiers",
    NotFound = "*",
    AddCourse = "/add-course/:dossierId",
    EditCourse = "/edit-course/:id/:dossierId",
    DeleteCourse = "/delete-course/:dossierId",
    DeleteCourseGrouping = "/delete-course-grouping/:dossierId",
    DeleteCourseGroupingEdit = "/delete-course-grouping-edit/:dossierId",
    DeleteCourseEdit = "/delete-course-edit/:dossierId",
    ComponentsList = "/components-list",
    CourseBrowser = "/CourseBrowser",
    ManageableGroup = "/manageablegroup",
    Groups = "/groups",
    CreateGroup = "/creategroup",
    AddUserToGroup = "/addusertogroup",
    RemoveUserFromGroup = "/removeuserfromgroup",
    DossierDetails = "/dossierdetails/:dossierId",
    DossierReview = "/dossierReview/:dossierId",
    DossierReport = "/dossierReport/:dossierId",
    DossierChangeLog = "/change-log",
    AddGroupMaster = "/addgroupmaster",
    RemoveGroupMaster = "/removegroupmaster",
    DossiersToReview = "/dossierstoreview",
    DossierBrowser = "/dossierbrowser",
    CourseDetails = "/CourseDetails",
    GroupingBySchool = "/GetCourseBySchool",
    GroupingByName = "/GetCourseByName",
    NoData = "/NoData",
    CourseGrouping = "/CourseGrouping/:courseGroupingId",
    myGroups = "/myGroups",
    profile = "/profile",
    editProfileInfo = "/editProfileInfo",
    browserList = "/browserList",
    CreateCourseGrouping = "/add/CourseGrouping/:dossierId",
    EditCourseGrouping = "/edit/CourseGrouping/:dossierId/:courseGroupingId",
    allGroups = "/allGroups",
    groupDetails = "/GroupDetails",
}
