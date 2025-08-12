import express from "express";
import UserTable from "./models/userModel.js";
import RoleTable from "./models/roleModel.js";
import PermissionTable from "./models/permissionModel.js";
import UserRoleTable from "./models/userRoleModel.js";
import RolePermissionTable from "./models/rolePermissionModel.js";
import sequlize from "./config/database.js";

const app = express();
const PORT = 9000;

UserTable.create({ name: "admin", email: "admin@mail.com", password: "ljkenf23hrfoi" });
UserTable.create({ name: "jop", email: "jojj@mail.com", password: "ksjhdfb928hf" });

RoleTable.create({ role_name: "admin" });
RoleTable.create({ role_name: "tier1_user" });
RoleTable.create({ role_name: "tier2_user" });
RoleTable.create({ role_name: "tier3_user" });
RoleTable.create({ role_name: "premium_user" });
RoleTable.create({ role_name: "moderator" });

PermissionTable.create({ permission_name: "blog_read" });
PermissionTable.create({ permission_name: "video_watch" });
PermissionTable.create({ permission_name: "newspaper_read" });
PermissionTable.create({ permission_name: "app_read" });
PermissionTable.create({ permission_name: "property_read" });
permission_name: PermissionTable.create({ permission_name: "blog_create" });
PermissionTable.create({ permission_name: "video_create" });
PermissionTable.create({ permission_name: "newspaper_create" });
PermissionTable.create({ permission_name: "app_create" });
PermissionTable.create({ permission_name: "property_read" });
permission_name: PermissionTable.create({ permission_name: "blog_update" });
PermissionTable.create({ permission_name: "video_update" });
PermissionTable.create({ permission_name: "newspaper_update" });
PermissionTable.create({ permission_name: "app_update" });
PermissionTable.create({ permission_name: "property_update" });
permission_name: PermissionTable.create({ permission_name: "blog_delete" });
PermissionTable.create({ permission_name: "video_delete" });
PermissionTable.create({ permission_name: "newspaper_delete" });
PermissionTable.create({ permission_name: "app_update" });
PermissionTable.create({ permission_name: "property_update" });
permission_name: PermissionTable.create({ permission_name: "blog_share" });
PermissionTable.create({ permission_name: "video_share" });
PermissionTable.create({ permission_name: "newspaper_share" });
PermissionTable.create({ permission_name: "app_share" });
PermissionTable.create({ permission_name: "property_share" });
permission_name: PermissionTable.create({ permission_name: "blog_embed" });
PermissionTable.create({ permission_name: "video_embed" });
PermissionTable.create({ permission_name: "newspaper_embed" });
PermissionTable.create({ permission_name: "app_embed" });
PermissionTable.create({ permission_name: "property_embed" });
permission_name: PermissionTable.create({ permission_name: "blog_pip" });
PermissionTable.create({ permission_name: "video_pip" });
PermissionTable.create({ permission_name: "newspaper_pip" });
PermissionTable.create({ permission_name: "app_pip" });
PermissionTable.create({ permission_name: "property_pip" });
permission_name: PermissionTable.create({ permission_name: "blog_customize" });
PermissionTable.create({ permission_name: "video_customize" });
PermissionTable.create({ permission_name: "newspaper_customize" });
PermissionTable.create({ permission_name: "app_customize" });
PermissionTable.create({ permission_name: "property_customize" });

UserRoleTable.create({ user_id: 1, role_id: 1 });
UserRoleTable.create({ user_id: 2, role_id: 2 });

RolePermissionTable.create({ role_id: 1, permission_id: 1 });
RolePermissionTable.create({ role_id: 1, permission_id: 2 });
RolePermissionTable.create({ role_id: 1, permission_id: 3 });

app.listen(PORT, () => {
  console.log(`App listening on ${PORT}`);
});

try {
  await sequlize.sync({ force: true });
  console.log("All models synced successfully");
} catch (err) {
  console.error(err);
}

export default app;
