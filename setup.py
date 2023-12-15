from setuptools import setup, find_packages

with open("requirements.txt") as f:
	install_requires = f.read().strip().split("\n")

# get version from __version__ variable in cost_management/__init__.py
from cost_management import __version__ as version

setup(
	name="cost_management",
	version=version,
	description="Cost management module for Lyte ERP",
	author="Natnael Tilaye",
	author_email="natnaeltilaye30@gmail.com",
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)
