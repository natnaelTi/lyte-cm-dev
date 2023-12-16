// Copyright (c) 2023, Natnael Tilaye and contributors
// For license information, please see license.txt

frappe.ui.form.on('Tender Offer', {
    refresh: function (frm) {
        // Add "Create" drop-down button for documents with status "Waiting Ticket"
        if (frm.doc.status === 'Waiting Ticket' && !frm.custom_buttons_created) {
            frm.add_custom_button(__('Create'), function () {
                frm.trigger('create_dropdown_options');
            }).addClass('btn-primary');

            frm.custom_buttons_created = true;
        }

        // Add "View Process Ticket" button next to the "Create" dropdown button
        if (frm.doc.process_lot_ticket && !frm.custom_view_button_created) {
            frm.add_custom_button(__('View Process Ticket'), function () {
                frm.trigger('view_process_ticket');
            }).addClass('btn-primary');

            frm.custom_view_button_created = true;
        }

        // Add "View BoQ" button next to the "View Process Ticket" button if a Quotation is linked
        if (frm.doc.proposed_boq && !frm.custom_boq_button_created) {
            frm.add_custom_button(__('View BoQ'), function () {
                frm.trigger('view_boq');
            }).addClass('btn-primary');

            frm.custom_boq_button_created = true;
        }

        // Add "Tasks" button under the "Create" dropdown
        if (frm.doc.status !== 'Draft' && !frm.custom_tasks_button_created) {
            frm.page.add_menu_item(__('Tasks'), function () {
                frm.trigger('create_tasks');
            }, 'Create');

            frm.custom_tasks_button_created = true;
        }

        // Add "Request for Information" button under the "Create" dropdown if a Bill of Quantity is linked
        if (frm.doc.proposed_bill_of_quantity && !frm.custom_rfi_button_created) {
            frm.page.add_menu_item(__('Request for Information'), function () {
                frm.trigger('create_rfi');
            }, 'Create');

            frm.custom_rfi_button_created = true;
        }
    },

    create_dropdown_options: function (frm) {
        frappe.prompt([
            { 'fieldname': 'process_lot_ticket', 'fieldtype': 'Link', 'label': 'Tender Offer Process Lot Ticket', 'options': 'Tender Offer Process Lot Ticket' },
        ], function (values) {
            // Handle the selected options and create the necessary documents
            if (values.process_lot_ticket) {
                frm.trigger('create_process_lot_ticket', values.process_lot_ticket);
            }
        }, 'Create Tender Offer Documents', 'Create');
    },

    create_process_lot_ticket: function (frm, process_lot_ticket) {
        // Handle the creation of Tender Offer Process Lot Ticket document
        frappe.model.with_doctype('Tender Offer Process Lot Ticket', function () {
            var doc = frappe.model.get_new_doc('Tender Offer Process Lot Ticket');
            doc.tender_offer = frm.doc.name;
            doc.customer = frm.doc.customer;
            doc.project = frm.doc.project;
            doc.required_by = frm.doc.required_by;

            // Additional fields can be set here

            frappe.set_route('Form', 'Tender Offer Process Lot Ticket', doc.name);
        });
    },

    view_process_ticket: function (frm) {
        frappe.set_route('Form', 'Tender Offer Process Lot Ticket', frm.doc.process_lot_ticket);
    },

    view_boq: function (frm) {
        frappe.set_route('Form', 'Quotation', frm.doc.linked_quotation);
    },

    create_tasks: function (frm) {
        // Handle the creation of Task document
        frappe.model.with_doctype('Task', function () {
            var doc = frappe.model.get_new_doc('Task');
            doc.tender_offer = frm.doc.name;
            doc.project = frm.doc.project;
            doc.required_by = frm.doc.required_by;
            doc.tender_offer_process_lot_ticket = frm.doc.process_lot_ticket;

            // Additional fields can be set here

            frappe.set_route('Form', 'Task', doc.name);
        });
    },

    create_rfi: function (frm) {
        // Handle the creation of Request for Information document
        frappe.model.with_doctype('Request for Information', function () {
            var doc = frappe.model.get_new_doc('Request for Information');
            doc.tender_offer = frm.doc.name;
            doc.customer = frm.doc.customer;
            doc.project = frm.doc.project;
            doc.company = frm.doc.company;

            // Additional fields can be set here

            frappe.set_route('Form', 'Request for Information', doc.name);
        });
    },
});
