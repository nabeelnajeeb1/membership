// Copyright (c) 2022, m20zero and contributors
// For license information, please see license.txt

frappe.ui.form.on("Invoice Item", {
	qty: function(frm, cdt, cdn){
		let child = frappe.get_doc(cdt, cdn);
		frappe.model.set_value(child.doctype, child.name, "amount", child.qty*child.rate);
		update_amount(frm);
	},
	rate: function(frm, cdt, cdn){
		let child = frappe.get_doc(cdt, cdn);
		frappe.model.set_value(child.doctype, child.name, "amount", child.qty*child.rate);
		update_amount(frm);
	},
	items_remove: function(frm, cdt, cdn){
		update_amount(frm);
	},
	items_add: function(frm, cdt, cdn){
		update_amount(frm);
	}
});

function update_amount(frm){
	let table = frm.doc.items;
	let amount = 0;
	let qty = 0;
	for(let t in table){
		qty += table[t].qty;
		amount += table[t].amount;
	}

	cur_frm.set_value("total_qty", qty);
	cur_frm.set_value("total", amount);
}

frappe.ui.form.on("Invoice", {
	refresh: function(frm) {
		if(cur_frm.doc.docstatus == 1){
			frm.add_custom_button(__("Make Recipt Voucher"), function(){
				if(cur_frm.is_dirty()){
					frappe.msgprint("Please save the form before creating Recipt Voucher")
				}else{
					let doc = frappe.model.get_new_doc("Receipt Vouchers");
					doc.posting_date = frappe.datetime.now_date();
					doc.naming_series = "RV-.YY.-";
					doc.party_type = cur_frm.doc.party_type;
					doc.party = cur_frm.doc.party;
					doc.party_name = cur_frm.doc.party_name;
					let child = frappe.model.get_new_doc("Receipt Item", doc, "items");
					$.extend(child, {
						"invoice": cur_frm.doc.name,
						"date": cur_frm.doc.date,
						"total":cur_frm.doc.total
					});
					doc.total_qty = 1;
					doc.total = cur_frm.doc.amount;
					frappe.set_route("FORM", doc.doctype, doc.name);
				}
			});
		}
	}
});

