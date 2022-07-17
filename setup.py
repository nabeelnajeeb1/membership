from setuptools import setup, find_packages

with open("requirements.txt") as f:
	install_requires = f.read().strip().split("\n")

# get version from __version__ variable in membership/__init__.py
from membership import __version__ as version

setup(
	name="membership",
	version=version,
	description="membership handling",
	author="m20zero",
	author_email="membership@gmail.com",
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)
