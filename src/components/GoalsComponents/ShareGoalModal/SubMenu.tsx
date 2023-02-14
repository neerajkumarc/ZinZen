import React from "react";
import { useSetRecoilState } from "recoil";

import { addPollsInPublicGroup } from "@src/api/PublicGroupsAPI";
import { GoalItem } from "@src/models/GoalItem";
import { IPoll, PublicGroupItem } from "@src/models/PublicGroupItem";
import { sendUpdateOfNewPoll } from "@src/services/group.service";
import { displayToast, lastAction } from "@src/store";
import { createPollObject } from "@src/utils/defaultGenerators";

export const SubMenuItem = ({ goal, group }: { goal: GoalItem, group: PublicGroupItem }) => {
  const setShowToast = useSetRecoilState(displayToast);
  const setLastAction = useSetRecoilState(lastAction);
  return (
    <button
      style={{
        background: "transparent",
        border: "none",
        borderBottom: "0.4px solid #4A4A4A",
        padding: "10px",
        width: "100%"
      }}
      type="button"
      className="share-Options"
      onClick={async () => {
        if (group) {
          const poll: IPoll = createPollObject(goal);
          await addPollsInPublicGroup(group.id, [poll]);
          const res = await sendUpdateOfNewPoll(group.id, poll);
          const message = res.success ? "Goal is shared successfully" : "failed to send add poll update";
          setLastAction("pollAdded");
          setShowToast({ open: true, message, extra: "" });
        }
      }}
    >
      <div style={{ fontSize: "1.4em", fontWeight: "500", marginRight: "15px", alignSelf: "center" }}>{group.title[0]}</div>
      <p style={{ alignSelf: "center", margin: 0, fontWeight: "500" }}>{group.title}</p>
    </button>
  );
};

const SubMenu = ({ children }) => <div>{children}</div>;

export default SubMenu;
