# Copyright (c) 2023, Natnael Tilaye and contributors
# For license information, please see license.txt

# import frappe
from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class TenderOfferProcessLotTicket(Document):
	def on_submit(doc, method):
    # Update linked Tender Offer document's process_lot_ticket field
    frappe.db.set_value('Tender Offer', doc.tender_offer, 'process_lot_ticket', doc.name)

    # Change status of linked Tender Offer document to "Processing Linked Documents"
    frappe.db.set_value('Tender Offer', doc.tender_offer, 'status', 'Processing Linked Documents')
