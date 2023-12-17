# Copyright (c) 2023, Natnael Tilaye and contributors
# For license information, please see license.txt

# import frappe
from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class TenderOffer(Document):
    def validate(self):
        # Validate and set status on creation
        if self.get('__islocal'):
            if self.required_by and self.required_by < frappe.utils.nowdate():
                self.status = 'OverDue'
            else:
                self.status = 'Draft'


        def before_submit(self):
            # Change status to "Waiting Ticket" on submit if not overdue
            if self.status != 'OverDue':
                self.status = 'Waiting Ticket'

        custom_script = 'cost_management/doctype/tender_offer/tender_offer.js'