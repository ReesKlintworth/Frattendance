Template.meeting.events({
  'click .member': function(){
    event.preventDefault();
    var id = event.target.id;
    var ids = id.split(":");
    Meteor.call("toggleAttended", ids[0], ids[1]);
  },

  'click #delete': function(){
    var id = this._id;
    Meteor.call("deleteMeeting", id);
    Router.go('home');
  }
});

Template.meeting.helpers({
  'member': function(){
    var members = MeetingAttendance.find({meetingId: this._id}).fetch();
    var memberIds = [];
    for(i = 0; i < members.length; i++) {
      memberIds.push(members[i].memberId);
    }
    return Members.find({ _id: {$in: memberIds}}, {
        sort: [
            ["active", "desc"],
            ["last", "asc"],
            ["first", "asc"]]
    });
  },

  'buttonColor': function(parentContext){
    var attendance = MeetingAttendance.findOne({$and: [{meetingId: parentContext._id}, {memberId: this._id}]});
    var buttonClass = "btn member"
    buttonClass = attendance.attended ? buttonClass + " btn-success" : buttonClass + " btn-danger";
    var member = Members.findOne({_id: this._id});
    return member.active === "true" ? buttonClass + " active-member" : buttonClass + " pledge-member";
  },

  'id': function(parentContext){
    return parentContext._id + ":" + this._id;
  },

  'quorumReached': function(){
    var quorumPercent = parseFloat(Meteor.settings.public.quorumPercent);
    var meetingAttendance = MeetingAttendance.find({meetingId: this._id}).fetch();
    var attendingActiveMembers = 0;
    var totalActiveMembers = 0;
    for (i = 0; i < meetingAttendance.length; i++) {
      var attendance = MeetingAttendance.findOne({$and: [{meetingId: this._id}, {memberId: meetingAttendance[i].memberId}]});
      var member = Members.findOne({_id: meetingAttendance[i].memberId});
      if (member.active === "true") {
        totalActiveMembers++;
      }
      if (attendance.attended && member.active === "true") {
        attendingActiveMembers++;
      }
    }
    return (attendingActiveMembers / totalActiveMembers) > quorumPercent;
   }
});