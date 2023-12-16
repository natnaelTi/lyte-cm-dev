# Copyright (c) 2023, Natnael Tilaye and contributors
# For license information, please see license.txt

# import frappe
from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class RequestforInformation(Document):
	def on_submit(doc, method):
		# Update linked Tender Offer document's status field to "Completed"
		frappe.db.set_value('Tender Offer', doc.tender_offer, 'status', 'Completed')
