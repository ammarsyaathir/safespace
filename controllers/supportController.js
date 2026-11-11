/**
 * SafeSpace MY - ITT588 Lab Work 03: Front-End Technology
 * Controller: supportController.js
 * Purpose: Handles support check-in data processing, risk categorization, and recommendations.
 */

module.exports = {
  processCheckin: (req, res) => {
    const { nickname, danger, supportType, notes } = req.body;

    let status = "safe";
    let title = "Support information";
    let advice =
      "Consider speaking with a trusted person or an established support service when you feel ready.";

    if (danger === "yes") {
      status = "urgent";
      title = "Immediate safety comes first";
      advice =
        "If you are in immediate danger, move to a safer place if possible and call 999 immediately. You do not need to complete any forms to seek emergency help.";
    } else if (danger === "unsure") {
      status = "caution";
      title = "Take your concern seriously";
      advice =
        "If possible, contact a trusted person or support service and think about where you could go if the situation becomes unsafe.";
    }

    const labels = {
      safety: "Safety planning",
      emotional: "Emotional support or counselling",
      legal: "Legal or protection information",
      shelter: "Shelter or practical support",
      friend: "Supporting a friend or family member",
      learn: "Learning more",
    };

    const responseData = {
      name: nickname || "Anonymous",
      danger: danger || "no",
      status,
      title,
      advice,
      supportArea: labels[supportType] || "General Support",
      notes: notes || "",
      timestamp: new Date().toLocaleString("en-MY", {
        timeZone: "Asia/Kuala_Lumpur",
      }),
    };

    res.json({
      success: true,
      message: "Check-in evaluated successfully.",
      data: responseData,
    });
  },
};
