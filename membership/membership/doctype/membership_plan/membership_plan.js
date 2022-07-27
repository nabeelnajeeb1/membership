// Copyright (c) 2022, m20zero and contributors
// For license information, please see license.txt

frappe.ui.form.on('Membership Plan',{
	refresh: function(frm) {				
		frm.add_custom_button(__("Register as Member"), function(){
			if(cur_frm.is_dirty()){
				frappe.msgprint("Please save the form before creating Membership")
			}else{
				let doc = frappe.model.get_new_doc("Membership Registration");
				console.log(cur_frm.doc.membership_plan)
				doc.membership_type = cur_frm.doc.membership_plan;
				doc.name1="";
				doc.email = " ";
				doc.date_of_birth = "";
				doc.mobile = "";
				doc.amount = cur_frm.doc.amount ;
				doc.period = cur_frm.doc.period;
				doc.valid__from = frappe.datetime.nowdate();
				frappe.set_route("FORM", doc.doctype, doc.name);
				cur_frm.insert();
			}
		});
	}
});